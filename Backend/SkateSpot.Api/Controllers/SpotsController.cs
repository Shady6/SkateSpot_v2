using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Application.Features.SpotFeatures.Queries;
using SkateSpot.Application.Services.Interfaces;
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
		public async Task<ActionResult> GetSpots([FromBody] GetSpotsQuery request)
		{
			var response = _spotsService.GetSpots(request);
			return Ok(response);
		}
	}
}