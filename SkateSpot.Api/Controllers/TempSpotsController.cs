using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Controllers.Common;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Features.TempSpotFeatures.Queries;

namespace SkateSpot.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TempSpotsController : BaseApiController
	{
		[Authorize]
		[HttpPost]
		public async Task<ActionResult> CreateSpot(CreateTempSpotCommand request)
		{
			var spotId = await SendAsync<Guid, CreateTempSpotCommand>(request);
			return Ok(new { spotId });
		}

		[HttpGet("{spotId}")]
		public async Task<ActionResult> GetWithVerification([FromRoute] GetTempSpotWithVerificationQuery request)
		{
			var spot = await SendAsync<TempSpotWithVerificationDto, GetTempSpotWithVerificationQuery>(request);
			return Ok(spot);
		}
	}
}