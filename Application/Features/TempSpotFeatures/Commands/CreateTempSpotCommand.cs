using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class CreateTempSpotCommand : AuthorizedCommand, IRequest<Guid>
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public AddressDto Address { get; set; }
		public byte SurfaceScore { get; set; }
		public ObstaclesDto Obstacles { get; set; }
		public List<Image> Images { get; set; }

		public class CreateTempSpotCommandHandler : IRequestHandler<CreateTempSpotCommand, Guid>
		{
			private readonly ITempSpotService _tempSpotService;

			public CreateTempSpotCommandHandler(ITempSpotService tempSpotService)
			{
				_tempSpotService = tempSpotService;
			}

			public async Task<Guid> Handle(CreateTempSpotCommand request, CancellationToken cancellationToken)
			{
				var tempSpotId = await _tempSpotService.CreateTempSpot(request);
				return tempSpotId;
			}
		}
	}
}