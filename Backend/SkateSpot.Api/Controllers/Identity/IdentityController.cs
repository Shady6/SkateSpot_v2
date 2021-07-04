using Microsoft.AspNetCore.Mvc;
using SkateSpot.Application.DTOs.Identity;
using SkateSpot.Application.Interfaces;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers.Identity
{
	[Route("api/identity")]
	[ApiController]
	public class IdentityController : ControllerBase
	{
		private readonly IIdentityService _identityService;

		public IdentityController(IIdentityService identityService)
		{
			_identityService = identityService;
		}

		[HttpPost("token")]
		public async Task<IActionResult> GetToken([FromBody] TokenRequest tokenRequest)
		{
			var ipAddress = GenerateIPAddress();
			var token = await _identityService.GetTokenAsync(tokenRequest, ipAddress);
			return Ok(token);
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterRequest request)
		{
			var origin = Request.Headers["origin"];
			return Ok(await _identityService.RegisterAsync(request, origin));
		}

		[HttpGet("confirm-email")]
		public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string code)
		{
			return Ok(await _identityService.ConfirmEmailAsync(userId, code));
		}

		[HttpPost("forgot-password")]
		public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
		{
			await _identityService.ForgotPassword(model, Request.Headers["origin"]);
			return Ok();
		}

		[HttpPost("reset-password")]
		public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
		{
			return Ok(await _identityService.ResetPassword(model));
		}

		private string GenerateIPAddress()
		{
			if (Request.Headers.ContainsKey("X-Forwarded-For"))
				return Request.Headers["X-Forwarded-For"];
			else
				return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
		}
	}
}