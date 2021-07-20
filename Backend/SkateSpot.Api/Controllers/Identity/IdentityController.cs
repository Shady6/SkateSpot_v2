using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Data;
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
		[ProducesResponseType(typeof(ApiResponse<TokenResponse>), 200)]
		public async Task<ActionResult<TokenResponse>> GetToken([FromBody] TokenRequest tokenRequest)
		{
			var ipAddress = GenerateIPAddress();
			var token = await _identityService.GetTokenAsync(tokenRequest, ipAddress);
			return Ok(token);
		}

		[HttpPost("register")]
		[ProducesResponseType(typeof(ApiResponse<string>), 200)]
		public async Task<ActionResult<string>> Register([FromBody] RegisterRequest request)
		{
			var origin = Request.Headers["origin"];
			return Ok(await _identityService.RegisterAsync(request, origin));
		}

		[HttpGet("confirm-email")]
		[ProducesResponseType(typeof(ApiResponse<string>), 200)]
		public async Task<ActionResult<string>> ConfirmEmail([FromQuery] string userId, [FromQuery] string code)
		{
			return Ok(await _identityService.ConfirmEmailAsync(userId, code));
		}

		[HttpPost("forgot-password")]
		public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
		{
			await _identityService.ForgotPassword(model, Request.Headers["origin"]);
			return Ok();
		}

		[HttpPost("reset-password")]
		[ProducesResponseType(typeof(ApiResponse<string>), 200)]
		public async Task<ActionResult<string>> ResetPassword([FromBody] ResetPasswordRequest model)
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