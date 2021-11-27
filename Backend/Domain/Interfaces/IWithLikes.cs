using SkateSpot.Domain.Models;
using System.Collections.Generic;

namespace SkateSpot.Domain.Interfaces
{
	public interface IWithLikes
	{
		public ICollection<Like> Likes { get; }
	}
}