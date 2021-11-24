using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Infrastructure.DbContexts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/spots")]
	[ApiController]
	public class SpotsController : ControllerBase
	{
		private readonly ISpotsService _spotsService;
		private readonly ApplicationDbContext _dbContext;
		private readonly IMapper _mapper;

		public SpotsController(ISpotsService spotsService,
						 IMapper mapper,
						 ApplicationDbContext dbContext)
		{
			_spotsService = spotsService;
			_mapper = mapper;
			_dbContext = dbContext;
		}

		[HttpGet]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<SpotDto>>), 200)]
		public async Task<ActionResult> GetSpots([FromQuery] int take, [FromQuery] int offset)
		{
			return Ok(new WithTotalCount<SpotDto>
			{
				Data = await _mapper.ProjectTo<SpotDto>(_dbContext.Spots
					.OrderByDescending(s => s.CreatedAt)
					.Skip(offset)
					.Take(take))
				.ToArrayAsync(),
				TotalCount = await _dbContext.Spots
				.CountAsync()
			});
		}

		[HttpGet("{spotName}")]
		[ProducesResponseType(typeof(ApiResponse<SpotDto>), 200)]
		public async Task<ActionResult> GetSpot([FromRoute] string spotName)
		{
			return Ok(await _mapper.ProjectTo<SpotDto>(_dbContext.Spots)
				.FirstOrDefaultAsync(s => s.Name == spotName));
		}

		[HttpGet]
		[Route("marker")]
		[ProducesResponseType(typeof(ApiResponse<List<SpotMarkerDataDto>>), 200)]
		public async Task<ActionResult<List<SpotMarkerDataDto>>> GetPermaAndTempSpotsMarkerData()
		{
			return Ok(await _spotsService.GetPermaAndTempSpotsMarkerData());
		}

		[Authorize]
		[HttpDelete("{Id}")]
		[MapRouteArgAndUserIdIntoBody(typeof(DeleteSpotCommand))]
		public async Task<ActionResult> DeleteSpot([FromRoute] DeleteSpotCommand request)
		{
			await _spotsService.DeleteSpot(request);
			return Ok();
		}
	}
}