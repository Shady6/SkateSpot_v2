using Newtonsoft.Json;
using SkateSpot.Application.DTOs;
using System;

namespace SkateSpot.Application.Features.CommentFeatures.Commands
{
	public class EditCommentCommand
	{
		[JsonIgnore]
		public Guid SubjectId { get; set; }

		[JsonIgnore]
		public CommentSubjectType SubjectType { get; set; }

		[JsonIgnore]
		public Guid CommentId { get; set; }

		public string NewText { get; set; }

		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}