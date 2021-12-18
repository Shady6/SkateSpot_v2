using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class DeleteTempSpotCommand
	{
		[FromRoute(Name = "id")]
		public Guid Id { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}