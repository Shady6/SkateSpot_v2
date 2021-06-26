using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Controllers.Common;
using SkateSpot.Application.Features.LikeFeatures.Commands;

namespace SkateSpot.Api.Controllers
{
	[Route("api")]
	[ApiController]
	[Authorize]
	public class LikesController : BaseApiController
	{
		[HttpPost("{subjectType}/{subjectId}/Likes")]
		public async Task<ActionResult> Like([FromRoute] LikeCommand request)
		{
			await SendAsync(request);

			return Ok();
		}

		[HttpDelete("{subjectType}/{subjectId}/Likes")]
		public async Task<ActionResult> DeleteLike([FromRoute] DeleteLikeCommand request)
		{
			await SendAsync(request);

			return Ok();
		}
	}
}