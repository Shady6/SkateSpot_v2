﻿using Newtonsoft.Json;
using RestSharp;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class CreateTempSpotCommand
	{
		public string Name { get; set; }

		public string Description { get; set; }

		public AddressDto Address { get; set; }

		public byte SurfaceScore { get; set; }

		public HashSet<ObstacleType> Obstacles { get; set; }

		public List<string> LinkImages { get; set; }

		public List<string> Base64Images { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }

		private readonly string[] acceptedImageFormats = { "png", "jpg", "jpeg", "webp" };

		public async Task<IEnumerable<string>> ConvertLinkImagesToBase64Images()
		{
			var client = new RestClient();
			return (await Task.WhenAll(
				LinkImages.Select(l =>
				client.ExecuteAsync(
					new RestRequest(
						new Uri(l), Method.GET)))))
				.Where(r => r.ContentType.StartsWith("image/") && acceptedImageFormats.Any(f => r.ContentType.EndsWith(f)))
				.Select(r =>
				{
					var b64 = Convert.ToBase64String(r.RawBytes);
					if (!b64.StartsWith("data:image"))
						return $"data:image/{r.ContentType[(r.ContentType.IndexOf('/') + 1)..]};base64,{b64}";
					return b64;
				});
		}

		public void RemoveInvalidBase64Images()
		{
			Base64Images = Base64Images.Where(b64 =>
				acceptedImageFormats.Any(f =>
					b64.StartsWith($"data:image/{f};base64"))).ToList();
		}

		public string[] GetInvalidLinks()
		{
			return new[] { "a" };
		}
	}
}