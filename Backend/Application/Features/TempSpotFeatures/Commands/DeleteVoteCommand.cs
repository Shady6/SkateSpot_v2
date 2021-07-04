using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class DeleteVoteCommand
	{
		public Guid TempSpotId { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}