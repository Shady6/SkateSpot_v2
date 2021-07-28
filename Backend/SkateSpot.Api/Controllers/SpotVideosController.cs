using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/")]
	[ApiController]
	[Authorize]
	public class SpotVideosController : ControllerBase
	{
		private readonly ISpotVideosService _spotVideosService;

		public SpotVideosController(ISpotVideosService spotVideosService)
		{
			_spotVideosService = spotVideosService;
		}

		[HttpPost("spots/{spotId}/spotVideos")]
		[MapRouteArgAndUserIdIntoBody(typeof(AddSpotVideoCommand))]
		public async Task<ActionResult> AddSpotVideo([FromRoute] Guid spotId, [FromBody] AddSpotVideoCommand request)
		{
			await _spotVideosService.AddSpotVideo(request);
			return Ok();
		}

		[HttpDelete("spots/{spotId}/spotVideos/{spotVideoId}")]
		public async Task<ActionResult> DeleteSpotVideo([FromRoute] DeleteSpotVideoCommand request)
		{
			await _spotVideosService.DeleteSpotVideo(request);
			return Ok();
		}
	}
}