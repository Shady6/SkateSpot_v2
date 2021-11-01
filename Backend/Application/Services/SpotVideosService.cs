using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Models;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
    public class SpotVideosService : Service, ISpotVideosService
    {
        private readonly ISpotRepository _spotRepository;

        public SpotVideosService(ISpotRepository spotRepository)
        {
            _spotRepository = spotRepository;
        }

        public async Task AddSpotVideo(AddSpotVideoCommand request)
        {
            var foundSpot = await ThrowOnNullAsync(() => _spotRepository.FindByNameAsync(request.SpotName));

            var spotVideo = new SpotVideo(request.EmbedId, request.PlatformType, request.UserId, request.Description);
            foundSpot.AddSpotVideo(spotVideo);

            await _spotRepository.SaveChangesAsync();
        }

        public async Task DeleteSpotVideo(DeleteSpotVideoCommand request)
        {
            var foundSpot = await ThrowOnNullAsync(() => _spotRepository.GetByIdAsync(request.spotId));

            foundSpot.DeleteSpotVideo(request.spotVideoId, request.UserId);

            await _spotRepository.SaveChangesAsync();
        }
    }
}