using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class DeleteVoteCommand
	{
		public Guid tempSpotId { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}