using System.Threading.Tasks;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IVoteService
	{
		Task DeleteVote(DeleteVoteCommand request);
		Task Vote(VoteCommand request);
	}
}
