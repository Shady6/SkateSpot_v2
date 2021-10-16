using System;
using System.Collections.Generic;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;

namespace SkateSpot.Domain.Models
{
	public class SpotVideo : EditableEntity, ICommentable, ILikeable
	{
		public string Url { get; protected set; }
		public Guid AuthorId { get; protected set; }
		public User Author { get; protected set; }
		public Guid? SpotId { get; protected set; }
		public Spot Spot { get; protected set; }

		public ICollection<Like> Likes
		{
			get => Likeable.Likes;
			protected set => Likeable.SetLikes(value);
		}

		public LikeableEntity Likeable { get; protected set; } = new LikeableEntity();

		public ICollection<Comment> Comments
		{
			get => Commentable.Comments;
			protected set => Commentable.SetComments(value);
		}

		public CommentableEntity Commentable { get; protected set; } = new CommentableEntity();

		public SpotVideo()
		{
		}

		public SpotVideo(string url, Guid userId)
		{
			Url = url;
			AuthorId = userId;
		}

		public void Like(Like like) =>
			Likeable.Like(like);

		public void DeleteLike(Guid userId) =>
			Likeable.DeleteLike(userId);

		public void AddComment(Comment comment) =>
			Commentable.AddComment(comment);

		public void DeleteComment(Guid commentId, Guid userId) =>
			Commentable.DeleteComment(commentId, userId);

		public void EditComment(Guid commentId, Guid userId, string newText) =>
			Commentable.EditComment(commentId, userId, newText);
	}
}