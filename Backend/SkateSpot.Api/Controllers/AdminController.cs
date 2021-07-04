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

		[HttpPost("seed")]
		public async Task<ActionResult> SeedFakeSpots()
		{
			await _adminService.SeedFakeSpots();
			return Ok();
		}
	}
}