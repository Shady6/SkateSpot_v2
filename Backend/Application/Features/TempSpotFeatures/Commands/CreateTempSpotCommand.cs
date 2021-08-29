using Newtonsoft.Json;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class CreateTempSpotCommand
	{
		public string Name { get; set; }

		public string Description { get; set; }

		public AddressDto Address { get; set; }

		public byte SurfaceScore { get; set; }

		public HashSet<ObstacleType> Obstacles { get; set; }

		public List<string> FileImages { get; set; }

		public List<string> LinkImages { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}