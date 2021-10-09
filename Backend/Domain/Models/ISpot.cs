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
		ICollection<ObstacleTypeObj> Obstacles { get; }
		byte SurfaceScore { get; }
	}
}