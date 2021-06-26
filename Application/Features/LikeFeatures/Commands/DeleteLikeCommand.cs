using Newtonsoft.Json;
using SkateSpot.Application.DTOs;
using System;

namespace SkateSpot.Application.Features.LikeFeatures.Commands
{
	public class DeleteLikeCommand
	{
		public Guid SubjectId { get; set; }

		public LikeSubjectType SubjectType { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}