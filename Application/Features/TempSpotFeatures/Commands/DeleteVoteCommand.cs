using Newtonsoft.Json;
using System;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class DeleteVoteCommand
	{
		public Guid TempSpotId { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}