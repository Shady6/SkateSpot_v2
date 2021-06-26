using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.TempSpotFeatures.Commands
{
	public class VoteCommand : AuthorizedCommand, IRequest
	{
		[JsonIgnore]
		public Guid TempSpotId { get; set; }

		public bool IsReal { get; set; }

		public class VoteCommandHandler : IRequestHandler<VoteCommand>
		{
			private readonly IVoteService _voteService;

			public VoteCommandHandler(IVoteService voteService)
			{
				_voteService = voteService;
			}

			public async Task<Unit> Handle(VoteCommand request, CancellationToken cancellationToken)
			{
				await _voteService.Vote(request);
				return Unit.Value;
			}
		}
	}
}