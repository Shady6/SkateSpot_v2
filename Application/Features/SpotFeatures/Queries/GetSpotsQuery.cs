using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.SearchFiltering;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.SpotFeatures.Queries
{
	public class GetSpotsQuery : IRequest<List<SpotDto>>
	{
		public SpotSearchFilter SpotSearchFilter { get; set; }

		public class GetSpotsQueryHandler : IRequestHandler<GetSpotsQuery, List<SpotDto>>
		{
			private readonly ISpotService _spotService;

			public GetSpotsQueryHandler(ISpotService spotService)
			{
				_spotService = spotService;
			}

			public Task<List<SpotDto>> Handle(GetSpotsQuery request, CancellationToken cancellationToken)
			{
				var spots = _spotService.GetSpots(request);
				return Task.FromResult(spots);
			}		
		}
	}
}