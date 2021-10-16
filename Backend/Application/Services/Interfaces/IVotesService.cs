using SkateSpot.Application.DTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IVotesService
	{
		Task<VoteResult> DeleteVote(DeleteVoteCommand request);
		Task<VoteResult> Vote(VoteCommand request);
	}
}
