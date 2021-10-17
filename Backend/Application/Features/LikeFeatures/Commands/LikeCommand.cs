using SkateSpot.Application.DTOs;
using System;
using System.Text.Json.Serialization;

namespace SkateSpot.Application.Features.LikeFeatures.Commands
{
	public class LikeCommand
	{
		[JsonIgnore]
		public Guid SubjectId { get; set; }

		[JsonIgnore]
		public LikeSubjectType SubjectType { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }

		public bool Positive { get; set; }
	}
}