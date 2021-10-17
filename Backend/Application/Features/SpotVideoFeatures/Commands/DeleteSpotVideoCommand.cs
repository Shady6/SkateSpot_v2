﻿using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class DeleteSpotVideoCommand
	{
		public Guid spotId { get; set; }

		public Guid spotVideoId { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}