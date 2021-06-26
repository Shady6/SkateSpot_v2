using System;
using System.Collections.Generic;
using SkateSpot.Domain.Common;

namespace SkateSpot.Domain.Models
{
	public class HistoricalComment : BaseEntity
	{
		public Guid? AuthorId { get; protected set; }
		public User Author { get; protected set; }
		public string Text { get; protected set; }
		public bool IsDeleted { get; protected set; }
		public DateTime EditedAt { get; protected set; }
		public ICollection<Like> Likes { get; set; }

		public HistoricalComment()
		{

		}

		public HistoricalComment(Comment comment)
		{
			AuthorId = comment.AuthorId;
			Text = comment.Text;
			IsDeleted = comment.IsDeleted;
			CreatedAt = comment.CreatedAt;
			EditedAt = comment.EditedAt;
			Likes = comment.Likes;
		}
	}
}