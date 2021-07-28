using SkateSpot.Application.DTOs.DomainDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ISpotsService
	{
		Task<List<SpotMarkerDataDto>> GetPermaAndTempSpotsMarkerData();
		List<SpotDto> GetSpots();
	}
}
