using SkateSpot.Domain.Common;

namespace SkateSpot.Application.DTOs.Errors
{
	public class SkateSpotError
	{
		public DomainErrorCode ErrorCode { get; set; }
		public string Message { get; set; }
	}
}