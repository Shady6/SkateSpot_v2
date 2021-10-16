using AutoMapper;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Factories;
using SkateSpot.Domain.Models;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class VotesService : Service, IVotesService
	{
		private readonly ITempSpotRepository _tempSpotRepository;
		private readonly ISpotRepository _spotRepository;
		private readonly IMapper _mapper;

		public VotesService(ITempSpotRepository tempSpotRepository, ISpotRepository spotRepository, IMapper mapper)
		{
			_tempSpotRepository = tempSpotRepository;
			_spotRepository = spotRepository;
			_mapper = mapper;
		}

		public async Task<VoteResult> Vote(VoteCommand request)
		{
			var tempSpot = await ThrowOnNullAsync(() => _tempSpotRepository.GetWithVerificationVotesAsync(request.TempSpotId));

			tempSpot.VerificationProcess.Vote(request.UserId, request.IsReal);
			bool voteChanged = tempSpot.VerificationProcess.Votes.First(v => v.VoterId == request.UserId).VoteChanged;

			if (tempSpot.VerificationProcess.IsVerified)
				await MoveTempSpotToSpot(tempSpot);
			else if (voteChanged)
				await _tempSpotRepository.SaveChangesAsync();

			return new VoteResult
			{
				Verified = tempSpot.VerificationProcess.IsVerified,
				Votes = _mapper.Map<VerificationStatementDto[]>(tempSpot.VerificationProcess.Votes)
			};
		}

		public async Task<VoteResult> DeleteVote(DeleteVoteCommand request)
		{
			var tempSpot = await ThrowOnNullAsync(() => _tempSpotRepository.GetWithVerificationVotesAsync(request.TempSpotId));

			tempSpot.VerificationProcess.DeleteVote(request.UserId);

			if (tempSpot.VerificationProcess.IsVerified)
				await MoveTempSpotToSpot(tempSpot);
			else
				await _tempSpotRepository.SaveChangesAsync();

			return new VoteResult
			{
				Verified = tempSpot.VerificationProcess.IsVerified,
				Votes = _mapper.Map<VerificationStatementDto[]>(tempSpot.VerificationProcess.Votes)
			};
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