using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ITempSpotsService
	{
		Task<Guid> CreateTempSpot(CreateTempSpotCommand request);

		Task DeleteTempSpot(DeleteTempSpotCommand request);
	}
}