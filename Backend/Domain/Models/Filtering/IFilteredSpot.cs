using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Models
{
	public interface IFilteredSpot
	{
		public DateTime CreatedAt { get; }
		public ICollection<Comment> Comments { get; }
		public ICollection<Like> Likes { get; }
		public byte SurfaceScore { get; }
		public ICollection<ObstacleTypeObj> Obstacles { get; }
	}
}