using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ISpotVideosService
	{
		Task<SpotVideoDto> AddSpotVideo(AddSpotVideoCommand request);

		Task DeleteSpotVideo(DeleteSpotVideoCommand request);
	}
}