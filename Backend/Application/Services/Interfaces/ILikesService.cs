using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.LikeFeatures.Commands;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ILikesService
	{
		Task<LikeDto[]> DeleteLike(DeleteLikeCommand request);
		Task<LikeDto[]> Like(LikeCommand request);
	}
}
