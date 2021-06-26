using System.Threading.Tasks;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Services
{
	public class SpotVideoService : Service, ISpotVideoService
	{
		private readonly ISpotRepository _spotRepository;

		public SpotVideoService(ISpotRepository spotRepository)
		{
			_spotRepository = spotRepository;
		}

		public async Task AddSpotVideo(AddSpotVideoCommand request)
		{
			var foundSpot = await ThrowOnNullAsync(() => _spotRepository.GetByIdAsync(request.SpotId));

			var spotVideo = new SpotVideo(request.Url, request.UserId);
			foundSpot.AddSpotVideo(spotVideo);

			await _spotRepository.SaveChangesAsync();
		}

		public async Task DeleteSpotVideo(DeleteSpotVideoCommand request)
		{
			var foundSpot = await ThrowOnNullAsync(() => _spotRepository.GetByIdAsync(request.SpotId));

			foundSpot.DeleteSpotVideo(request.SpotVideoId, request.UserId);

			await _spotRepository.SaveChangesAsync();
		}
	}
}