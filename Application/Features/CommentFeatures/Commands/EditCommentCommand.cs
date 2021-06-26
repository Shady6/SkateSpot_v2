using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Features.CommentFeatures.Commands
{
	public class EditCommentCommand : AuthorizedCommand, IRequest
	{
		[JsonIgnore]
		public Guid SubjectId { get; set; }

		[JsonIgnore]
		public CommentSubjectType SubjectType { get; set; }

		[JsonIgnore]
		public Guid CommentId { get; set; }

		public string NewText { get; set; }

		public class EditCommentCommandHandler : IRequestHandler<EditCommentCommand>
		{
			private readonly ICommentService _commentService;

			public EditCommentCommandHandler(ICommentService commentService)
			{
				_commentService = commentService;
			}

			public async Task<Unit> Handle(EditCommentCommand request, CancellationToken cancellationToken)
			{
				await _commentService.EditComment(request);
				return Unit.Value;
			}
		}
	}
}