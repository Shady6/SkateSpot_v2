using SkateSpot.Application.DTOs;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IImageProxyService
	{
		Task<Base64FetchResult[]> GetBase64OfImagesUrls(string[] imagesUrls);
	}
}
