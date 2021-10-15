using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.Features.LikeFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
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
		public async Task<ActionResult> Like([FromRoute] LikeCommand request)
		{
			await _likesService.Like(request);
			return Ok();
		}

		[HttpDelete("{subjectType}/{subjectId}/Likes")]
		public async Task<ActionResult> DeleteLike([FromRoute] DeleteLikeCommand request)
		{
			request.UserId = User.GetUserId();
			await _likesService.DeleteLike(request);
			return Ok();
		}
	}
}