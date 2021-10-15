using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.DTOs;
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
		[ProducesResponseType(typeof(ApiResponse<OnVoteVerified>), 200)]
		public async Task<ActionResult> Vote([FromRoute] Guid tempSpotId, [FromBody] VoteCommand request)
		{
			return Ok(await _votesService.Vote(request));
		}

		[HttpDelete]
		[ProducesResponseType(typeof(ApiResponse<OnVoteVerified>), 200)]
		public async Task<ActionResult> DeleteVote([FromRoute] DeleteVoteCommand request)
		{
			request.UserId = User.GetUserId();
			return Ok(await _votesService.DeleteVote(request));
		}
	}
}