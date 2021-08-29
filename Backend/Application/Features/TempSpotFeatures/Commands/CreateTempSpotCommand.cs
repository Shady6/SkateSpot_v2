using Newtonsoft.Json;
using SkateSpot.Application.DTOs.DomainDTOs;
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

		public ObstaclesDto Obstacles { get; set; }

		public List<FileImageDto> FileImages { get; set; }

		public List<LinkImageDto> LinkImages { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}