using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
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
				Data = _mapper.Map<SpotDto[]>(await _dbContext.Spots
					.Skip(offset)
					.Take(take)
					.Include(s => s.Author)
					.Include(s => s.Likes)
					.Include(s => s.Comments.OrderByDescending(c => c.CreatedAt)).ThenInclude(c => c.Author)
					.Include(s => s.Comments).ThenInclude(c => c.Likes)
					.Include(s => s.Images)
					.ToArrayAsync()),

				TotalCount = await _dbContext.Spots
				.CountAsync()
			});
		}

		[HttpGet]
		[Route("marker")]
		[Authorize]
		[ProducesResponseType(typeof(ApiResponse<List<SpotMarkerDataDto>>), 200)]
		public async Task<ActionResult<List<SpotMarkerDataDto>>> GetPermaAndTempSpotsMarkerData()
		{
			return Ok(await _spotsService.GetPermaAndTempSpotsMarkerData());
		}
	}
}