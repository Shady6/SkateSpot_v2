using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/tempSpots/{tempSpotId}/vote")]
	[ApiController]
	[Authorize]
	public class VotesController : ControllerBase
	{
		private readonly IVotesService _votesService;

		public VotesController(IVotesService votesService)
		{
			_votesService = votesService;
		}

		[HttpPost]
		[MapRouteArgAndUserIdIntoBody(typeof(VoteCommand))]
		public async Task<ActionResult> Vote([FromRoute] Guid tempSpotId, [FromBody] VoteCommand request)
		{
			await _votesService.Vote(request);
			return Ok();
		}

		[HttpDelete]
		public async Task<ActionResult> DeleteVote([FromRoute] DeleteVoteCommand request)
		{
			await _votesService.DeleteVote(request);
			return Ok();
		}
	}
}