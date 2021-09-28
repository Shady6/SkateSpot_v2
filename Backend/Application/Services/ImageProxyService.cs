using RestSharp;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class ImageProxyService : Service, IImageProxyService
	{
		public async Task<Base64FetchResult[]> GetBase64OfImagesUrls(string[] imagesUrls)
		{
			var client = new RestClient();
			return await Task.WhenAll(
				imagesUrls.Select(async (url) =>
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
		}
	}
}