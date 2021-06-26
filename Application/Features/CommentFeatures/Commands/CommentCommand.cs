using Newtonsoft.Json;
using SkateSpot.Application.DTOs;
using System;

namespace SkateSpot.Application.Features.CommentFeatures.Commands
{
	public class CommentCommand
	{
		[JsonIgnore]
		public Guid SubjectId { get; set; }

		public string Text { get; set; }

		[JsonIgnore]
		public CommentSubjectType SubjectType { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}