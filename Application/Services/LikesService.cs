using System.Threading.Tasks;
using AutoMapper;
using SkateSpot.Application.Features.LikeFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using SkateSpot.Domain.Interfaces;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Services
{
	public class LikesService : Service, ILikesService
	{
		private readonly ILikeRepository _likeRepository;
		private readonly IMapper _mapper;

		public LikesService(ILikeRepository LikeRepository, IMapper mapper)
		{
			_likeRepository = LikeRepository;
			_mapper = mapper;
		}

		public async Task Like(LikeCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.SubjectType);
			var foundSubject = await ThrowOnNullAsync(() => _likeRepository.GetSubjectWithLikesAsync(subjectType, request.SubjectId));

			var like = new Like(request.UserId, subjectType);
			(foundSubject as ILikeable).AddLike(like);

			await _likeRepository.SaveChangesAsync();
		}

		public async Task DeleteLike(DeleteLikeCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.SubjectType);
			var foundSubject = await ThrowOnNullAsync(() => _likeRepository.GetSubjectWithLikesAsync(subjectType, request.SubjectId));

			(foundSubject as ILikeable).DeleteLike(request.UserId);

			await _likeRepository.SaveChangesAsync();
		}
	}
}