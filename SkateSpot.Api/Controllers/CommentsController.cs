using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Controllers.Common;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Features.CommentFeatures.Commands;

namespace SkateSpot.Api.Controllers
{
	[Route("api")]
	[ApiController]
	[Authorize]
	public class CommentsController : BaseApiController
	{		
		[HttpPost("{subjectType}/{subjectId}/comments")]
		[MapArgumentsTo(typeof(CommentCommand))]
		public async Task<ActionResult> Comment(CommentSubjectType subjectType, Guid subjectId, CommentCommand request)
		{
			await SendAsync(request);
			return Ok();
		}

		[HttpPut("{subjectType}/{subjectId}/comments/{commentId}")]
		[MapArgumentsTo(typeof(EditCommentCommand))]
		public async Task<ActionResult> EditComment(CommentSubjectType subjectType, Guid subjectId, Guid commentId, EditCommentCommand request)
		{
			await SendAsync(request);
			return Ok();
		}

		[HttpDelete("{subjectType}/{subjectId}/comments/{commentId}")]
		public async Task<ActionResult> DeleteComment([FromRoute] DeleteCommentCommand request)
		{
			await SendAsync(request);
			return Ok();
		}
	}
}