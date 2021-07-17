using System;
using System.Collections.Generic;
using System.Linq;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;

namespace SkateSpot.Domain.Models
{
	public class VerificationProcess : BaseEntity, ICommentable
	{
		public List<VerificationStatement> Votes { get; protected set; } = new List<VerificationStatement>();
		public DateTime EndDate { get; protected set; }
		public bool IsVerified { get; protected set; }

		public ICollection<Comment> Discussion
		{
			get => Commentable.Comments;
			protected set => Commentable.SetComments(value);
		}

		public CommentableEntity Commentable { get; protected set; } = new CommentableEntity();

		public readonly TimeSpan VerificationDuration = TimeSpan.FromDays(1);
		private const int MinRealVotesToConsiderVerifyOnAdd = 30;
		private const int MinRealFakeRatioToVerify = 3;

		public VerificationProcess()
		{
			IsVerified = false;
			EndDate = DateTime.Now + VerificationDuration;
		}

		public void AddComment(Comment comment) =>
			Commentable.AddComment(comment);

		public void DeleteComment(Guid commentId, Guid userId) =>
			Commentable.DeleteComment(commentId, userId);

		public void EditComment(Guid commentId, Guid userId, string newText) =>
			Commentable.EditComment(commentId, userId, newText);

		public bool HasVerificationPeriodEnded => DateTime.Now > EndDate;

		public bool HasVoted(Guid userId) => Votes.Any(v => v.VoterId == userId);

		public void DeleteVote(Guid voterId)
		{
			var foundVote = Votes.Where(v => v.VoterId == voterId).FirstOrDefault();

			if (foundVote != null)
			{
				Votes.Remove(foundVote);
				SetIsVerifiedOnVotesChanged();
			}
			else
				throw new AppException(ErrorCode.DOESNT_EXIST, "You don't have a vote to delete.");
		}

		public void Vote(Guid voterId, bool isReal)
		{
			var vote = Votes.Where(v => v.VoterId == voterId).FirstOrDefault();

			if (vote != null)
				vote.SetIsReal(isReal);
			else
			{
				vote = new VerificationStatement(voterId, isReal);
				Votes.Add(vote);
			}

			if (vote.VoteChanged)
				SetIsVerifiedOnVotesChanged();
		}

		private void SetIsVerifiedOnVotesChanged()
		{
			(int votedReal, int votedFake) = CountVotes();

			if (votedReal >= MinRealVotesToConsiderVerifyOnAdd &&
				(votedFake == 0 || (float)votedReal / votedFake >= MinRealFakeRatioToVerify))
				IsVerified = true;
		}

		public void SetIsVerifiedOnEndDate()
		{
			(int votedReal, int votedFake) = CountVotes();
			IsVerified = votedReal > votedFake;
		}

		private (int, int) CountVotes()
		{
			int votedReal = 0;
			int votedFake = 0;

			foreach (var vote in Votes)
			{
				if (vote.IsReal) votedReal++;
				else votedFake++;
			}
			return (votedReal, votedFake);
		}
	}
}