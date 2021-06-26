using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.SpotVideoFeatures.Commands
{
	public class DeleteSpotVideoCommand : AuthorizedCommand, IRequest
	{
		public Guid SpotId { get; set; }
		public Guid SpotVideoId { get; set; }

		public class DeleteSpotVideoCommandHandler : IRequestHandler<DeleteSpotVideoCommand>
		{
			private readonly ISpotVideoService _spotVideoService;

			public DeleteSpotVideoCommandHandler(ISpotVideoService spotRepository)
			{
				_spotVideoService = spotRepository;
			}

			public async Task<Unit> Handle(DeleteSpotVideoCommand request, CancellationToken cancellationToken)
			{
				await _spotVideoService.DeleteSpotVideo(request);
				return Unit.Value;
			}
		}
	}
}