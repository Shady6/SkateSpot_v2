using System;
using System.Text.Json.Serialization;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class AddSpotVideoCommand
	{
        public VideoPlatformType PlatformType { get; set; }

		public string EmbedId { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
		public string SpotName { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}