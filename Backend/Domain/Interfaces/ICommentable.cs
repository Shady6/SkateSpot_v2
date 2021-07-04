using System;
using System.Collections.Generic;
using SkateSpot.Domain.Models;

namespace SkateSpot.Domain.Interfaces
{
	public interface ICommentable
	{				
		public void AddComment(Comment comment);

		public void DeleteComment(Guid commentId, Guid userId);

		public void EditComment(Guid commentId, Guid userId, string newText);
	}
}