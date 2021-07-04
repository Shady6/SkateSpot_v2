using Microsoft.AspNetCore.Mvc.ModelBinding;
using SkateSpot.Application.DTOs;
using System;

namespace SkateSpot.Application.Features.LikeFeatures.Commands
{
	public class DeleteLikeCommand
	{
		public Guid SubjectId { get; set; }

		public LikeSubjectType SubjectType { get; set; }

		[BindNever]
		public Guid UserId { get; set; }
	}
}