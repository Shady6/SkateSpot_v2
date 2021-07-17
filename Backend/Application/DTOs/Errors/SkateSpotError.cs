using SkateSpot.Domain.Common;

namespace SkateSpot.Application.DTOs.Errors
{
	public class SkateSpotError
	{
		public ErrorCode ErrorCode { get; set; }
		public string Message { get; set; }
	}
}