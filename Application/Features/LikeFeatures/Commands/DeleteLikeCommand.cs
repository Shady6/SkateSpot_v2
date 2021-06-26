using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.LikeFeatures.Commands
{
	public class DeleteLikeCommand : AuthorizedCommand, IRequest
	{
		public Guid SubjectId { get; set; }

		public LikeSubjectType SubjectType { get; set; }

		public class DeleteLikeCommandHandler : IRequestHandler<DeleteLikeCommand>
		{
			private readonly ILikeService _likeService;

			public DeleteLikeCommandHandler(ILikeService likeService)
			{
				_likeService = likeService;
			}

			public async Task<Unit> Handle(DeleteLikeCommand request, CancellationToken cancellationToken)
			{
				await _likeService.DeleteLike(request);
				return Unit.Value;
			}
		}
	}
}