using AutoMapper;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.LikeFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;
using SkateSpot.Domain.Models;
using System.Threading.Tasks;

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

		public async Task<LikeDto[]> Like(LikeCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.SubjectType);
			var foundSubject = await ThrowOnNullAsync(() => _likeRepository.GetSubjectWithLikesAsync(subjectType, request.SubjectId)) as ILikeable;

			var like = new Like(request.UserId, request.Positive);
			foundSubject.Like(like);

			await _likeRepository.SaveChangesAsync();

			return _mapper.Map<LikeDto[]>(foundSubject.Likes);
		}

		public async Task<LikeDto[]> DeleteLike(DeleteLikeCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.subjectType);
			var foundSubject = await ThrowOnNullAsync(() => _likeRepository.GetSubjectWithLikesAsync(subjectType, request.subjectId)) as ILikeable;

			foundSubject.DeleteLike(request.UserId);

			await _likeRepository.SaveChangesAsync();

			return _mapper.Map<LikeDto[]>(foundSubject.Likes);
		}
	}
}