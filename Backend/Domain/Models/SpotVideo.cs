using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;
using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Models
{
	public enum VideoPlatformType
	{
		Instagram,
		YouTube
	}

	public class SpotVideo : EditableEntity, ICommentable, ILikeable
	{
		public string EmbedId { get; protected set; }
		public string Description { get; protected set; }
		public VideoPlatformType PlatformType { get; protected set; }
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

		public SpotVideo(string embedId,
				   VideoPlatformType platformType,
				   Guid userId,
				   string description)
		{
			EmbedId = embedId;
			PlatformType = platformType;
			AuthorId = userId;
			Description = description;
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