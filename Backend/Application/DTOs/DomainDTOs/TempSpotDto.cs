using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class TempSpotDto
	{
		public Guid Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public AddressDto Address { get; set; }
		public IEnumerable<ObstacleType> Obstacles { get; set; }
		public byte SurfaceScore { get; set; }
		public SmallUserDto Author { get; set; }
		public VerificationProcessDto VerificationProcess { get; set; }
		public ImageDto[] Images { get; set; }
	}
}