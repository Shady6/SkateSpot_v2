using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class AddSpotVideoCommand : AuthorizedCommand, IRequest
	{
		public string Url { get; set; }

		[JsonIgnore]
		public Guid SpotId { get; set; }

		public class AddSpotVideoCommandHandler : IRequestHandler<AddSpotVideoCommand>
		{
			private readonly ISpotVideoService _spotVideoService;

			public AddSpotVideoCommandHandler(ISpotVideoService spotRepository)
			{
				_spotVideoService = spotRepository;
			}

			public async Task<Unit> Handle(AddSpotVideoCommand request, CancellationToken cancellationToken)
			{
				await _spotVideoService.AddSpotVideo(request);
				return Unit.Value;
			}
		}
	}
}