using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class SpotMarkerDataDto
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public bool IsTempSpot { get; set; }
		public AddressDto Address { get; set; }
		public ICollection<ObstacleType> Obstacles { get; set; }
		public byte SurfaceScore { get; set; }
	}
}