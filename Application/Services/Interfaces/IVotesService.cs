using System.Threading.Tasks;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IVotesService
	{
		Task DeleteVote(DeleteVoteCommand request);
		Task Vote(VoteCommand request);
	}
}
