using SkateSpot.Application.DTOs.DomainDTOs;
using System.Collections.Generic;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ISpotsService
	{
		List<SpotDto> GetSpots();
	}
}
