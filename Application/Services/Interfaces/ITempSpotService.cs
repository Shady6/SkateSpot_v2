using System;
using System.Threading;
using System.Threading.Tasks;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Features.TempSpotFeatures.Queries;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ITempSpotService
	{
		Task<Guid> CreateTempSpot(CreateTempSpotCommand request);

		Task<TempSpotWithVerificationDto> GetTempSpotWithVerification(GetTempSpotWithVerificationQuery request);
	}
}