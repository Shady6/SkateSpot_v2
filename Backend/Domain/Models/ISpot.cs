using System;

namespace SkateSpot.Domain.Models
{
	public interface ISpot
	{
		Address Address { get; }
		User Author { get; }
		Guid? AuthorId { get; }
		string Description { get; }
		string Name { get; }
		Obstacles Obstacles { get; }
		byte SurfaceScore { get; }
	}
}