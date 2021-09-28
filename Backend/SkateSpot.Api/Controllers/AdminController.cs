using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Application.Services.Interfaces;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/admin")]
	[ApiController]
	[Authorize(Roles = "SuperAdmin")]
	public class AdminController : ControllerBase
	{
		private readonly IAdminService _adminService;

		public AdminController(IAdminService adminService)
		{
			_adminService = adminService;
		}

		[HttpPost("seed/spots")]
		public async Task<ActionResult> SeedFakeSpots([FromQuery] int count = 5)
		{
			await _adminService.SeedFakeSpots(count);
			return Ok();
		}

		[HttpPost("seed/tempSpots")]
		public async Task<ActionResult> SeedFakeTempSpots([FromQuery] int count = 5)
		{
			await _adminService.SeedFakeTempSpots(count);
			return Ok();
		}
	}
}