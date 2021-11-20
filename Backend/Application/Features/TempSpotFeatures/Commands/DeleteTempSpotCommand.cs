using System;
using System.Text.Json.Serialization;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class DeleteTempSpotCommand
	{
		public Guid Id { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}