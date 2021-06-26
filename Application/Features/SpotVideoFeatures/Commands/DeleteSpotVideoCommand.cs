using Newtonsoft.Json;
using System;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class DeleteSpotVideoCommand
	{
		public Guid SpotId { get; set; }

		public Guid SpotVideoId { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}