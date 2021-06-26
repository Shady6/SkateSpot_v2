using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using SkateSpot.Domain.Interfaces;

namespace SkateSpot.Application.Features.LikeFeatures.Commands
{
	public class LikeCommand : AuthorizedCommand, IRequest
	{
		public Guid SubjectId { get; set; }

		public LikeSubjectType SubjectType { get; set; }

		public class LikeCommandHandler : IRequestHandler<LikeCommand>
		{
			private readonly ILikeService _likeService;

			public LikeCommandHandler(ILikeService likeService)
			{
				_likeService = likeService;
			}

			public async Task<Unit> Handle(LikeCommand request, CancellationToken cancellationToken)
			{
				await _likeService.Like(request);
				return Unit.Value;
			}
		}
	}
}