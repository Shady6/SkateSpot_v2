using System;
using System.Text.Json.Serialization;

namespace SkateSpot.Application.Features.SpotFeatures.Commands
{
	public class DeleteSpotCommand
	{
		public Guid Id { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}