using System;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class LikeDto
	{
		public Guid UserId { get; set; }
		public bool Positive { get; set; }
	}
}