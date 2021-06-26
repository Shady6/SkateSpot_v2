using System.Linq;
using System.Threading.Tasks;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Models;
using SkateSpot.Domain.Factories;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Services
{
	public class VoteService : Service, IVoteService
	{
		private readonly ITempSpotRepository _tempSpotRepository;
		private readonly ISpotRepository _spotRepository;

		public VoteService(ITempSpotRepository tempSpotRepository, ISpotRepository spotRepository)
		{
			_tempSpotRepository = tempSpotRepository;
			_spotRepository = spotRepository;
		}

		public async Task Vote(VoteCommand request)
		{
			var tempSpot = await ThrowOnNullAsync(() => _tempSpotRepository.GetWithVerificationVotesAsync(request.TempSpotId));

			tempSpot.VerificationProcess.Vote(request.UserId, request.IsReal);
			bool voteChanged = tempSpot.VerificationProcess.Votes.First(v => v.VoterId == request.UserId).VoteChanged;

			if (tempSpot.VerificationProcess.IsVerified)
				await MoveTempSpotToSpot(tempSpot);
			else if (voteChanged)
				await _tempSpotRepository.SaveChangesAsync();
		}

		public async Task DeleteVote(DeleteVoteCommand request)
		{
			var tempSpot = await ThrowOnNullAsync(() => _tempSpotRepository.GetWithVerificationVotesAsync(request.TempSpotId));

			tempSpot.VerificationProcess.DeleteVote(request.UserId);

			if (tempSpot.VerificationProcess.IsVerified)
				await MoveTempSpotToSpot(tempSpot);
			else
				await _tempSpotRepository.SaveChangesAsync();
		}

		private async Task MoveTempSpotToSpot(TempSpot tempSpot)
		{
			var verifiedTempSpot = await _tempSpotRepository.GetFullWithIdsAsync(tempSpot.Id);
			var spot = SpotFactory.CreateFromTempSpot(verifiedTempSpot);
			await _spotRepository.AddAsync(spot);
			_tempSpotRepository.Delete(verifiedTempSpot);
			await _tempSpotRepository.SaveChangesAsync();
		}
	}
}