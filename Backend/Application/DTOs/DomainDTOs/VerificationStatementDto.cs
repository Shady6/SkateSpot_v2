using System;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class VerificationStatementDto
	{
		public Guid VoterId { get; set; }
		public bool IsReal { get; set; }
	}
}