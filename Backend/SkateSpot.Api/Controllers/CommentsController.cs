using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Features.CommentFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api")]
	[ApiController]
	[Authorize]
	public class CommentsController : ControllerBase
	{
		private readonly ICommentsService _commentsService;

		public CommentsController(ICommentsService commentsService)
		{
			_commentsService = commentsService;
		}

		[HttpPost("{subjectType}/{subjectId}/comments")]
		[MapsRouteArgumentsIntoBody(typeof(CommentCommand))]
		public async Task<ActionResult> Comment([FromRoute] CommentSubjectType subjectType,
												[FromRoute] Guid subjectId,
												[FromBody] CommentCommand request)
		{
			await _commentsService.Comment(request);
			return Ok();
		}

		[HttpPut("{subjectType}/{subjectId}/comments/{commentId}")]
		[MapsRouteArgumentsIntoBody(typeof(EditCommentCommand))]
		public async Task<ActionResult> EditComment([FromRoute] CommentSubjectType subjectType,
													[FromRoute] Guid subjectId,
													[FromRoute] Guid commentId,
													[FromBody] EditCommentCommand request)
		{
			await _commentsService.EditComment(request);
			return Ok();
		}

		[HttpDelete("{subjectType}/{subjectId}/comments/{commentId}")]
		public async Task<ActionResult> DeleteComment([FromRoute] DeleteCommentCommand request)
		{
			await _commentsService.DeleteComment(request);
			return Ok();
		}
	}
}