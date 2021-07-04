using System;
using System.Collections.Generic;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class VerificationProcessDto
	{
		public Guid Id { get; set; }
		public List<VerificationStatementDto> Votes { get; set; }
		public DateTime EndDate { get; set; }
		public bool IsVerified { get; set; }
		public List<CommentDto> Discussion { get; set; }
	}
}