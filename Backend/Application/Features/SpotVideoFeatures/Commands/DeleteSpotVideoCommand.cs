using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class DeleteSpotVideoCommand
	{
		public Guid SpotId { get; set; }

		public Guid SpotVideoId { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}