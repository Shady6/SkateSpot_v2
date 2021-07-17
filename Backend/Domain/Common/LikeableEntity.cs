using System;
using System.Collections.Generic;
using System.Linq;
using SkateSpot.Domain.Models;
using SkateSpot.Domain.Interfaces;

namespace SkateSpot.Domain.Common
{
	public class LikeableEntity : ILikeable
	{
		public ICollection<Like> Likes { get; protected set; } = new List<Like>();

		public void SetLikes(ICollection<Like> likes)
		{
			Likes = likes;
		}

		public void AddLike(Like like)
		{
			var foundLike = Likes.FirstOrDefault(c => c.GiverId == like.GiverId);
			if (foundLike != null)
				throw new AppException(ErrorCode.ALREADY_EXISTS, "You've already liked this.");

			Likes.Add(like);
		}

		public void DeleteLike(Guid userId)
		{
			var foundLike = Likes.FirstOrDefault(c => c.GiverId == userId);
			if (foundLike == null)
				throw new AppException(ErrorCode.DOESNT_EXIST, "You have no like to delete.");

			Likes.Remove(foundLike);
		}
	}
}