using System;
using System.Collections.Generic;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public interface IWithSocialDto
	{
		public Guid Id { get; set; }
		public LikeDto[] Likes { get; set; }
		public IEnumerable<CommentDto> Comments { get; set; }
	}
}