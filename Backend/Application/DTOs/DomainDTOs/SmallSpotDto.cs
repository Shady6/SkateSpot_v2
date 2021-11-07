using System;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class SmallSpotDto
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public AddressDto Address { get; set; }
	}
}