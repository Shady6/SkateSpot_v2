using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Controllers.Common;
using SkateSpot.Application.Features.LikeFeatures.Commands;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;

namespace SkateSpot.Api.Controllers
{
	[Route("api/")]
	[ApiController]
	[Authorize]
	public class SpotVideosController : BaseApiController
	{
		[HttpPost("spots/{spotId}/spotVideos")]
		[MapArgumentsTo(typeof(AddSpotVideoCommand))]
		public async Task<ActionResult> AddSpotVideo(Guid spotId, AddSpotVideoCommand request)
		{
			await SendAsync(request);
			return Ok();
		}

		[HttpDelete("spots/{spotId}/spotVideos/{spotVideoId}")]		
		public async Task<ActionResult> DeleteSpotVideo([FromRoute] DeleteSpotVideoCommand request)
		{
			await SendAsync(request);
			return Ok();
		}
	}
}