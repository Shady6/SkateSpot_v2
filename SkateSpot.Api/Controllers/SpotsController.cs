using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Controllers.Common;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotFeatures.Queries;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;

namespace SkateSpot.Api.Controllers
{
	[Route("api/")]
	[ApiController]
	[Authorize]
	public class SpotsController : BaseApiController
	{
		[HttpPost("spots/{spotId}/spotVideos")]
		[MapArgumentsTo(typeof(AddSpotVideoCommand))]
		public async Task<ActionResult> AddSpotVideo(Guid spotId, AddSpotVideoCommand request)
		{
			await SendAsync(request);
			return Ok();
		}

		[HttpGet("spots")]	
		[AllowAnonymous]
		public async Task<ActionResult> AddSpotVideo(GetSpotsQuery request)
		{
			var result = await SendAsync<List<SpotDto>, GetSpotsQuery>(request);
			return Ok(result);
		}
	}
}