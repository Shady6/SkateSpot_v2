using System.Text.Json.Serialization;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class CreateTempSpotCommand
	{
		public string Name { get; set; }

		public string Description { get; set; }

		public AddressDto Address { get; set; }

		public byte SurfaceScore { get; set; }

		public HashSet<ObstacleType> Obstacles { get; set; }

		public List<string> Base64Images { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }

		private readonly string[] acceptedImageFormats = { "png", "jpg", "jpeg", "webp" };

		public void RemoveInvalidBase64Images()
		{
			Base64Images = Base64Images.Where(b64 =>
				acceptedImageFormats.Any(f =>
					b64.StartsWith($"data:image/{f};base64"))).ToList();
		}
	}
}