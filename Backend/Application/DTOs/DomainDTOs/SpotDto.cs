using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class SpotDto
	{
		public Guid Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public AddressDto Address { get; set; }
		public HashSet<ObstacleType> Obstacles { get; set; }
		public byte SurfaceScore { get; set; }
		public SmallUserDto Author { get; set; }
		public LikeDto[] Likes { get; set; }
		public IEnumerable<CommentDto> Comments { get; set; }
		public ImageDto[] Images { get; set; }
	}
}