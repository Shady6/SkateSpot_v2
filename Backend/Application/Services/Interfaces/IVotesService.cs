using SkateSpot.Application.DTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IVotesService
	{
		Task<OnVoteVerified> DeleteVote(DeleteVoteCommand request);
		Task<OnVoteVerified> Vote(VoteCommand request);
	}
}
