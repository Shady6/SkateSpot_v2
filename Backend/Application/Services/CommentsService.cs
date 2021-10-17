using AutoMapper;
using Microsoft.AspNetCore.Http;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.CommentFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;
using SkateSpot.Domain.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class CommentsService : Service, ICommentsService
	{
		private readonly ICommentRepository _commentRepository;
		private readonly IMapper _mapper;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public CommentsService(ICommentRepository commentRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
		{
			_commentRepository = commentRepository;
			_mapper = mapper;
			_httpContextAccessor = httpContextAccessor;
		}

		public async Task<CommentDto> Comment(CommentCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.SubjectType);
			var foundSubject = await ThrowOnNullAsync(() => _commentRepository.GetSubjectAsync(subjectType, request.SubjectId));

			var comment = new Comment(request.UserId, request.SubjectId, subjectType, request.Text);
			(foundSubject as ICommentable).AddComment(comment);

			await _commentRepository.SaveChangesAsync();
			var dto = _mapper.Map<CommentDto>(comment);
			dto.Author = new SmallUserDto
			{
				UserName = _httpContextAccessor.HttpContext.User.Claims
				.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value,
				Id = request.UserId
			};
			return dto;
		}

		public async Task EditComment(EditCommentCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.SubjectType);
			var foundSubject = await ThrowOnNullAsync(() => _commentRepository.GetSubjectWithCommentsAsync(subjectType, request.SubjectId));

			(foundSubject as ICommentable).EditComment(request.CommentId, request.UserId, request.NewText);

			await _commentRepository.SaveChangesAsync();
		}

		public async Task DeleteComment(DeleteCommentCommand request)
		{
			var subjectType = _mapper.Map<SubjectType>(request.SubjectType);
			var foundSubject = await ThrowOnNullAsync(() => _commentRepository.GetSubjectWithCommentsAsync(subjectType, request.SubjectId));

			(foundSubject as ICommentable).DeleteComment(request.CommentId, request.UserId);

			await _commentRepository.SaveChangesAsync();
		}
	}
}