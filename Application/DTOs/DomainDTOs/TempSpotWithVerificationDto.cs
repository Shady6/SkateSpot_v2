using System;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class TempSpotWithVerificationDto
	{
		public Guid Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public AddressDto Address { get; set; }
		public ObstaclesDto Obstacles { get; set; }
		public byte SurfaceScore { get; set; }
		public SmallUserDto Author { get; set; }
		public VerificationProcessDto VerificationProcess { get; set; }
	}
}