using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Controllers.Common;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;

namespace SkateSpot.Api.Controllers
{
	[Route("api/tempSpots/{tempSpotId}/vote")]
	[ApiController]
	[Authorize]
	public class VotesController : BaseApiController
	{
		[HttpPost]
		[MapArgumentsTo(typeof(VoteCommand))]
		public async Task<ActionResult> Vote(Guid tempSpotId, VoteCommand request)
		{
			await SendAsync(request);
			return Ok();
		}

		[HttpDelete]
		public async Task<ActionResult> DeleteVote([FromRoute] DeleteVoteCommand request)
		{
			await SendAsync(request);
			return Ok();
		}
	}
}