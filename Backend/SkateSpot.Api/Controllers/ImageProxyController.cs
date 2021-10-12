using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/ImageProxy")]
	[ApiController]
	[Authorize]
	public class ImageProxyController : ControllerBase
	{
		private readonly IImageProxyService _imageProxyService;

		public ImageProxyController(IImageProxyService imageProxyService)
		{
			_imageProxyService = imageProxyService;
		}

		[HttpGet("base64")]
		[ProducesResponseType(200, Type = typeof(ApiResponse<Base64FetchResult[]>))]
		public async Task<ActionResult> GetBase64Images([FromQuery] string[] imagesUrls)
		{
			return Ok(await _imageProxyService.GetBase64OfImagesUrls(imagesUrls));
		}
	}
}