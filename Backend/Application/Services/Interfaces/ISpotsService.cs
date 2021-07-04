using System.Collections.Generic;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotFeatures.Queries;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ISpotsService
	{
		List<SpotDto> GetSpots(GetSpotsQuery request);
	}
}
