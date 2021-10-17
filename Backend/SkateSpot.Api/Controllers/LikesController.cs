using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.LikeFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api")]
	[ApiController]
	[Authorize]
	public class LikesController : ControllerBase
	{
		private readonly ILikesService _likesService;

		public LikesController(ILikesService likesService)
		{
			_likesService = likesService;
		}

		[HttpPost("{subjectType}/{subjectId}/Likes")]
		[MapRouteArgAndUserIdIntoBody(typeof(LikeCommand))]
		[ProducesResponseType(typeof(ApiResponse<LikeDto[]>), 200)]
		public async Task<ActionResult> Like([FromRoute] LikeSubjectType subjectType,
									   [FromRoute] Guid subjectId,
									   [FromBody] LikeCommand request)
		{
			return Ok(await _likesService.Like(request));
		}

		[HttpDelete("{subjectType}/{subjectId}/Likes")]
		[ProducesResponseType(typeof(ApiResponse<LikeDto[]>), 200)]
		public async Task<ActionResult> DeleteLike([FromRoute] DeleteLikeCommand request)
		{
			request.UserId = User.GetUserId();
			return Ok(await _likesService.DeleteLike(request));
		}
	}
}