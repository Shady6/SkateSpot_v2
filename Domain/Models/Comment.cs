using System;
using System.Collections.Generic;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;

namespace SkateSpot.Domain.Models
{
	public class Comment : EditableEntity, ILikeable
	{
		public Guid? AuthorId { get; protected set; }
		public User Author { get; protected set; }
		public Guid SubjectId { get; protected set; }
		public string Text { get; protected set; }
		public bool IsDeleted { get; protected set; }
		public BaseEntity Subject { get; protected set; }
		public SubjectType SubjectType { get; protected set; }

		public ICollection<Like> Likes
		{
			get => Likeable.Likes;
			protected set => Likeable.SetLikes(value);
		}

		public LikeableEntity Likeable { get; protected set; } = new LikeableEntity();

		public Comment()
		{
		}

		public Comment(Guid authorId, Guid subjectId, SubjectType subjectType, string text)
		{
			AuthorId = authorId;
			SubjectId = subjectId;
			SubjectType = subjectType;
			Text = text;
		}

		public void UpdateCommentContent(string text)
		{
			Text = text;
			UpdateEditedAt();
		}

		public void AddLike(Like like) =>
			Likeable.AddLike(like);

		public void DeleteLike(Guid userId) =>
			Likeable.DeleteLike(userId);
	}
}