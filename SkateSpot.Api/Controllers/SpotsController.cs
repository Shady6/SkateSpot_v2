using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Application.Features.SpotFeatures.Queries;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/")]
	[ApiController]
	[Authorize]
	public class SpotsController : ControllerBase
	{
		private readonly ISpotsService _spotsService;

		public SpotsController(ISpotsService spotsService)
		{
			_spotsService = spotsService;
		}

		[HttpPost("spots/{spotId}/spotVideos")]
		[MapArgumentsTo(typeof(AddSpotVideoCommand))]
		public async Task<ActionResult> AddSpotVideo([FromRoute] Guid spotId, [FromBody] AddSpotVideoCommand request)
		{
			return Ok();
		}

		[HttpGet("spots")]
		[AllowAnonymous]
		public async Task<ActionResult> AddSpotVideo([FromBody] GetSpotsQuery request)
		{
			return Ok();
		}
	}
}