using SkateSpot.Domain.Models;
using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Interfaces
{
	public interface ILikeable
	{
		public ICollection<Like> Likes { get; }

		void Like(Like like);

		void DeleteLike(Guid userId);
	}
}