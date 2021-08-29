using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Models
{
	public interface ISpot
	{
		Address Address { get; }
		User Author { get; }
		Guid? AuthorId { get; }
		string Description { get; }
		string Name { get; }
		HashSet<ObstacleType> Obstacles { get; }
		byte SurfaceScore { get; }
	}
}