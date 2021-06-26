using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class DeleteVoteCommand : AuthorizedCommand, IRequest
	{
		public Guid TempSpotId { get; set; }

		public class DeleteVoteCommandHandler : IRequestHandler<DeleteVoteCommand>
		{
			private readonly IVoteService _voteService;

			public DeleteVoteCommandHandler(IVoteService voteService)
			{
				_voteService = voteService;
			}

			public async Task<Unit> Handle(DeleteVoteCommand request, CancellationToken cancellationToken)
			{
				await _voteService.DeleteVote(request);
				return Unit.Value;
			}
		}
	}
}