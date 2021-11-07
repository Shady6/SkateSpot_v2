using SkateSpot.Domain.Models;
using System;
using System.Collections.Generic;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class SpotVideoDto
	{
		public Guid Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public string Description { get; set; }
		public string EmbedId { get; set; }
		public VideoPlatformType PlatformType { get; set; }
		public SmallUserDto Author { get; set; }
		public LikeDto[] Likes { get; set; }
		public IEnumerable<CommentDto> Comments { get; set; }
		public SmallSpotDto Spot { get; set; }
	}
}