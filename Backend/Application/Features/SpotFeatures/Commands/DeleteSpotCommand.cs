using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;

namespace SkateSpot.Application.Features.SpotFeatures.Commands
{
	public class DeleteSpotCommand
	{
		public Guid Id { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}