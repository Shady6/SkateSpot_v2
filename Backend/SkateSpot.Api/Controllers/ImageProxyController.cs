using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using SkateSpot.Api.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	public class Base64FetchResult
	{
		public bool Success { get; set; }
		public string Base64 { get; set; }
	}

	[Route("api/ImageProxy")]
	[ApiController]
	[Authorize]
	public class ImageProxyController : ControllerBase
	{
		[HttpGet("base64")]
		[ProducesResponseType(200, Type = typeof(ApiResponse<Base64FetchResult[]>))]
		public async Task<ActionResult> GetBase64Images([FromQuery] string[] imageUrl)
		{
			var client = new RestClient();
			var result = await Task.WhenAll(
				imageUrl.Select(async (url) =>
				{
					try
					{
						var response = await client.ExecuteAsync(
							new RestRequest(
								new Uri(url), Method.GET));

						if (response.ContentType.StartsWith("image/"))
						{
							var b64 = Convert.ToBase64String(response.RawBytes);
							return new Base64FetchResult
							{
								Success = true,
								Base64 = b64.StartsWith("data:image") ?
								b64 :
								$"data:image/" +
								$"{response.ContentType[(response.ContentType.IndexOf('/') + 1)..]}" +
								$";base64,{b64}"

							};
						}
						return new Base64FetchResult { Success = false };
					}
					catch
					{
						return new Base64FetchResult { Success = false };
					}
				}
				));
			return Ok(result);
		}
	}
}