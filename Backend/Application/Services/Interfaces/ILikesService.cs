using System.Threading.Tasks;
using SkateSpot.Application.Features.LikeFeatures.Commands;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ILikesService
	{
		Task DeleteLike(DeleteLikeCommand request);
		Task Like(LikeCommand request);
	}
}
