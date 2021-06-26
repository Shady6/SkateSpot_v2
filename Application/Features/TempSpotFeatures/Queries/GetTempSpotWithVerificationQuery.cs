using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.TempSpotFeatures.Queries
{
	public class GetTempSpotWithVerificationQuery : IRequest<TempSpotWithVerificationDto>
	{
		public Guid SpotId { get; set; }

		public class GetSpotWithVerificationQueryHandler : IRequestHandler<GetTempSpotWithVerificationQuery, TempSpotWithVerificationDto>
		{
			private readonly ITempSpotService _tempSpotService;

			public GetSpotWithVerificationQueryHandler(ITempSpotService tempSpotService)
			{
				_tempSpotService = tempSpotService;
			}

			public async Task<TempSpotWithVerificationDto> Handle(GetTempSpotWithVerificationQuery request, CancellationToken cancellationToken)
			{
				return await _tempSpotService.GetTempSpotWithVerification(request);
			}
		}
	}
}