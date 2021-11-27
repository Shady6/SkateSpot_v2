using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.Filter;
using SkateSpot.Application.Features.SpotFeatures.Commands;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ISpotsService
	{
		Task DeleteSpot(DeleteSpotCommand request);

		Task<List<SpotMarkerDataDto>> GetPermaAndTempSpotsMarkerData(Filtering filtering);
	}
}