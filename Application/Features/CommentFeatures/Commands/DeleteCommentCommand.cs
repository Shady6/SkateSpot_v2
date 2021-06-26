using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.CommentFeatures.Commands
{
	public class DeleteCommentCommand : AuthorizedCommand, IRequest
	{
		public Guid SubjectId { get; set; }

		public CommentSubjectType SubjectType { get; set; }

		public Guid CommentId { get; set; }

		public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
		{
			private readonly ICommentService _commentService;

			public DeleteCommentCommandHandler(ICommentService commentService)
			{
				_commentService = commentService;
			}

			public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
			{
				await _commentService.DeleteComment(request);
				return Unit.Value;
			}
		}
	}
}