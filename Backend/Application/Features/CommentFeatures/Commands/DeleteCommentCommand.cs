using Microsoft.AspNetCore.Mvc.ModelBinding;
using SkateSpot.Application.DTOs;
using System;

namespace SkateSpot.Application.Features.CommentFeatures.Commands
{
	public class DeleteCommentCommand
	{
		public Guid SubjectId { get; set; }

		public CommentSubjectType SubjectType { get; set; }

		public Guid CommentId { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}