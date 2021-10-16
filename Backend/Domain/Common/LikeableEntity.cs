using SkateSpot.Domain.Interfaces;
using SkateSpot.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkateSpot.Domain.Common
{
	public class LikeableEntity : ILikeable
	{
		public ICollection<Like> Likes { get; protected set; } = new List<Like>();

		public void SetLikes(ICollection<Like> likes)
		{
			Likes = likes;
		}

		public void Like(Like like)
		{
			var foundLike = Likes.FirstOrDefault(c => c.GiverId == like.GiverId);

			if (foundLike != null)
				foundLike.SetIsPositive(like.Positive);
			else
				Likes.Add(like);

		}

		public void DeleteLike(Guid userId)
		{
			var foundLike = Likes.FirstOrDefault(c => c.GiverId == userId);
			if (foundLike == null)
				throw new AppException(ErrorCode.DOESNT_EXIST, "You don't have a like to delete.");

			Likes.Remove(foundLike);
		}
	}
}