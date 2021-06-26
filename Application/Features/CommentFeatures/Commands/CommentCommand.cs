using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.CommentFeatures.Commands
{
	public class CommentCommand : AuthorizedCommand, IRequest
	{
		[JsonIgnore]
		public Guid SubjectId { get; set; }

		public string Text { get; set; }

		[JsonIgnore]
		public CommentSubjectType SubjectType { get; set; }

		public class CommentCommandHandler : IRequestHandler<CommentCommand>
		{
			private readonly ICommentService _commentService;

			public CommentCommandHandler(ICommentService commentService)
			{
				_commentService = commentService;
			}

			public async Task<Unit> Handle(CommentCommand request, CancellationToken cancellationToken)
			{
				await _commentService.Comment(request);
				return Unit.Value;
			}
		}
	}
}