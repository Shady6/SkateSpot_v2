using System.Threading.Tasks;
using SkateSpot.Application.Features.CommentFeatures.Commands;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ICommentsService
	{
		Task Comment(CommentCommand request);
		Task DeleteComment(DeleteCommentCommand request);
		Task EditComment(EditCommentCommand request);
	}
}
