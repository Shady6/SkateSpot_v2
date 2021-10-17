using Microsoft.AspNetCore.Mvc.ModelBinding;
using SkateSpot.Application.DTOs;
using System;

namespace SkateSpot.Application.Features.LikeFeatures.Commands
{
	public class DeleteLikeCommand
	{
		public Guid subjectId { get; set; }

		public LikeSubjectType subjectType { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}