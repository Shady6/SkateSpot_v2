using System;
using System.Collections.Generic;
using System.Linq;
using SkateSpot.Domain.Models;
using SkateSpot.Domain.Interfaces;

namespace SkateSpot.Domain.Common
{
	public class CommentableEntity : ICommentable
	{
		public ICollection<Comment> Comments { get; protected set; } = new List<Comment>();

		public void SetComments(ICollection<Comment> comments)
		{
			Comments = comments;
		}

		public void AddComment(Comment comment)
		{
			Comments.Add(comment);
		}

		public void DeleteComment(Guid commentId, Guid userId)
		{
			var foundComment = Comments.FirstOrDefault(c => c.Id == commentId);
			ValidateComment(foundComment, userId);
			Comments.Remove(foundComment);
		}

		public void EditComment(Guid commentId, Guid userId, string newText)
		{
			var foundComment = Comments.FirstOrDefault(c => c.Id == commentId);
			ValidateComment(foundComment, userId);
			foundComment.UpdateCommentContent(newText);
		}

		private void ValidateComment(Comment comment, Guid userId)
		{
			if (comment == null)
				throw new AppException(ErrorCode.DOESNT_EXIST, "The comment doesn't exist.");
			else if (comment.AuthorId != userId)
				throw new AppException(ErrorCode.NOT_OWNED, "You don't own this comment.");
		}
	}
}