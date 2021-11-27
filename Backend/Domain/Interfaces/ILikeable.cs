using SkateSpot.Domain.Models;
using System;

namespace SkateSpot.Domain.Interfaces
{
	public interface ILikeable : IWithLikes
	{
		void Like(Like like);

		void DeleteLike(Guid userId);
	}
}