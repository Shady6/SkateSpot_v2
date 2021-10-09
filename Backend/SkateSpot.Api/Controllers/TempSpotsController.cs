using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Features.TempSpotFeatures.Queries;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Models;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TempSpotsController : ControllerBase
	{
		private readonly ITempSpotsService _tempSpotsService;
		private readonly IGetterService<TempSpot> _getterService;

		public TempSpotsController(ITempSpotsService tempSpotsService, IGetterService<TempSpot> getterService)
		{
			_tempSpotsService = tempSpotsService;
			_getterService = getterService;
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

		[HttpGet]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<TempSpotWithVerificationDto>>), 200)]
		public async Task<ActionResult<TempSpotWithVerificationDto>> GetTempSpots([FromQuery] int take, [FromQuery] int offset)
		{
			var spots = await _getterService.Get<TempSpotWithVerificationDto>(take, offset);
			return Ok(spots);
		}
	}
}