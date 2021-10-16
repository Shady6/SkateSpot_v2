using SkateSpot.Application.DTOs.DomainDTOs;

namespace SkateSpot.Application.DTOs
{
	public class VoteResult
	{
		public bool Verified { get; set; }
		public VerificationStatementDto[] Votes { get; set; }
	}
}