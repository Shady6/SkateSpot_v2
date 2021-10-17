using System;
using System.Text.Json.Serialization;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class AddSpotVideoCommand
	{
		public string Url { get; set; }

		[JsonIgnore]
		public Guid SpotId { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}