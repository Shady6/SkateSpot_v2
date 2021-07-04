using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Features.TempSpotFeatures.Queries;
using SkateSpot.Application.Services.Interfaces;
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
		public async Task<ActionResult> CreateSpot([FromBody] CreateTempSpotCommand request)
		{
			var spotId = await _tempSpotsService.CreateTempSpot(request);
			return Ok(new { spotId });
		}

		[HttpGet("{spotId}")]
		public async Task<ActionResult> GetWithVerification([FromRoute] GetTempSpotWithVerificationQuery request)
		{
			var spot = await _tempSpotsService.GetTempSpotWithVerification(request);
			return Ok(spot);
		}
	}
}