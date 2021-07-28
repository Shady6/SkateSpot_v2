using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/spots")]
	[ApiController]
	[Authorize]
	public class SpotsController : ControllerBase
	{
		private readonly ISpotsService _spotsService;

		public SpotsController(ISpotsService spotsService)
		{
			_spotsService = spotsService;
		}

		[HttpGet]
		[AllowAnonymous]
		[ProducesResponseType(typeof(ApiResponse<List<SpotDto>>), 200)]
		public async Task<ActionResult<List<SpotDto>>> GetSpots()
		//public async Task<ActionResult> GetSpots([FromQuery] GetSpotsQuery request)
		{
			var response = _spotsService.GetSpots();
			return Ok(response);
		}

		[HttpGet]
		[Route("marker")]
		[Authorize]
		[ProducesResponseType(typeof(ApiResponse<List<SpotMarkerDataDto>>), 200)]
		public async Task<ActionResult<List<SpotMarkerDataDto>>> GetPermaAndTempSpotsMarkerData()
		{
			return Ok(await _spotsService.GetPermaAndTempSpotsMarkerData());
		}
	}
}