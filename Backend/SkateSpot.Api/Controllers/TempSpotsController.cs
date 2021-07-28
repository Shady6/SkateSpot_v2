using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Features.TempSpotFeatures.Queries;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TempSpotsController : ControllerBase
	{
		private readonly ITempSpotsService _tempSpotsService;

		public TempSpotsController(ITempSpotsService tempSpotsService)
		{
			_tempSpotsService = tempSpotsService;
		}

		[Authorize]
		[HttpPost]
		[ProducesResponseType(typeof(ApiResponse<Guid>), 200)]
		[MapRouteArgAndUserIdIntoBody(typeof(CreateTempSpotCommand))]
		public async Task<ActionResult<Guid>> CreateSpot([FromBody] CreateTempSpotCommand request)
		{
			return Ok(await _tempSpotsService.CreateTempSpot(request));
		}

		[HttpGet("{spotId}")]
		[ProducesResponseType(typeof(ApiResponse<TempSpotWithVerificationDto>), 200)]
		public async Task<ActionResult<TempSpotWithVerificationDto>> GetWithVerification([FromRoute] GetTempSpotWithVerificationQuery request)
		{
			var spot = await _tempSpotsService.GetTempSpotWithVerification(request);
			return Ok(spot);
		}
	}
}