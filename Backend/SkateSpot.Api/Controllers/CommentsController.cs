using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
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
		[MapRouteArgAndUserIdIntoBody(typeof(CommentCommand))]
		[ProducesResponseType(typeof(ApiResponse<CommentDto>), 200)]
		public async Task<ActionResult> Comment([FromRoute] CommentSubjectType subjectType,
												[FromRoute] Guid subjectId,
												[FromBody] CommentCommand request)
		{
			return Ok(await _commentsService.Comment(request));
		}

		[HttpPut("{subjectType}/{subjectId}/comments/{commentId}")]
		[MapRouteArgAndUserIdIntoBody(typeof(EditCommentCommand))]
		public async Task<ActionResult> EditComment([FromRoute] CommentSubjectType subjectType,
													[FromRoute] Guid subjectId,
													[FromRoute] Guid commentId,
													[FromBody] EditCommentCommand request)
		{
			await _commentsService.EditComment(request);
			return Ok();
		}

		[HttpDelete("{SubjectType}/{SubjectId}/comments/{CommentId}")]
		public async Task<ActionResult> DeleteComment([FromRoute] DeleteCommentCommand request)
		{
			request.UserId = User.GetUserId();
			await _commentsService.DeleteComment(request);
			return Ok();
		}
	}
}