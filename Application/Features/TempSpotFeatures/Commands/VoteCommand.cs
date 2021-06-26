using Newtonsoft.Json;
using System;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class VoteCommand
	{
		[JsonIgnore]
		public Guid TempSpotId { get; set; }

		public bool IsReal { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}