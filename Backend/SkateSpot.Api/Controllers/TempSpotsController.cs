using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Infrastructure.DbContexts;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TempSpotsController : ControllerBase
	{
		private readonly ITempSpotsService _tempSpotsService;
		private readonly ApplicationDbContext _dbContext;
		private readonly IMapper _mapper;

		public TempSpotsController(ITempSpotsService tempSpotsService,
							 ApplicationDbContext dbContext,
							 IMapper mapper)
		{
			_tempSpotsService = tempSpotsService;
			_dbContext = dbContext;
			_mapper = mapper;
		}

		[Authorize]
		[HttpPost]
		[ProducesResponseType(typeof(ApiResponse<Guid>), 200)]
		[MapRouteArgAndUserIdIntoBody(typeof(CreateTempSpotCommand))]
		public async Task<ActionResult<Guid>> CreateSpot([FromBody] CreateTempSpotCommand request)
		{
			return Ok(await _tempSpotsService.CreateTempSpot(request));
		}

		[HttpGet]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<TempSpotWithVerificationDto>>), 200)]
		public async Task<ActionResult> GetTempSpots([FromQuery] int take, [FromQuery] int offset)
		{
			return Ok(new WithTotalCount<TempSpotWithVerificationDto>
			{
				Data = await _mapper.ProjectTo<TempSpotWithVerificationDto>(
					_dbContext.TempSpots
					.Where(s => s.VerificationProcess.EndDate > DateTime.Now)
					.Include(s => s.VerificationProcess)
					.ThenInclude(s => s.Discussion.OrderByDescending(c => c.CreatedAt))
					.Skip(offset)
					.Take(take)
					).ToArrayAsync(),

				TotalCount = await _dbContext.TempSpots
				.Where(s => s.VerificationProcess.EndDate > DateTime.Now)
				.CountAsync()
			});
		}

		[HttpGet("{id}")]
		[ProducesResponseType(typeof(ApiResponse<TempSpotWithVerificationDto>), 200)]
		public async Task<ActionResult> GetTempSpot([FromRoute] Guid id)
		{
			return Ok(await _mapper.ProjectTo<TempSpotWithVerificationDto>(_dbContext.TempSpots
					).FirstOrDefaultAsync(s => s.Id == id));
		}
	}
}