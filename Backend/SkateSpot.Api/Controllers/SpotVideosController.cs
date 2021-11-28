using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.Filter;
using SkateSpot.Application.Extensions;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/")]
	[ApiController]
	[Authorize]
	public class SpotVideosController : ControllerBase
	{
		private readonly ISpotVideosService _spotVideosService;
		private readonly ApplicationDbContext _dbContext;
		private readonly IMapper _mapper;

		public SpotVideosController(ISpotVideosService spotVideosService,
									IMapper mapper,
									ApplicationDbContext dbContext)
		{
			_spotVideosService = spotVideosService;
			_mapper = mapper;
			_dbContext = dbContext;
		}

		[AllowAnonymous]
		[HttpGet("spotVideos")]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<SpotVideoDto>>), 200)]
		public async Task<ActionResult> GetSpotVideos([FromQuery] int take,
													[FromQuery] int offset,
													[FromQuery] SortAndFilter snf)
		{
			if (snf.Filtering == null ||
				(snf.Filtering.SurfaceFilter == null && snf.Filtering.ObstaclesFilter == null))
				return Ok(new WithTotalCount<SpotVideoDto>
				{
					Data = await _mapper.ProjectTo<SpotVideoDto>(
						_dbContext.SpotVideos
						.ApplySort(snf.Sorting)
						.Cast<SpotVideo>()
						.Skip(offset)
						.Take(take)).ToArrayAsync(),
					TotalCount = await _dbContext.SpotVideos
					.CountAsync()
				});
			else
				return Ok(new WithTotalCount<SpotVideoDto>
				{
					Data = await _mapper.ProjectTo<SpotVideoDto>(
						_dbContext.Spots
						.ApplyFilters(snf.Filtering)
						.Cast<Spot>()
						.SelectMany(s => s.Videos)
						.ApplySort(snf.Sorting)
						.Skip(offset)
						.Take(take)).ToArrayAsync(),
					TotalCount = await _dbContext.Spots
						.ApplyFilters(snf.Filtering)
						.Cast<Spot>()
						.SelectMany(s => s.Videos)
					.CountAsync()
				});
		}

		[AllowAnonymous]
		[HttpGet("spots/{spotName}/spotVideos")]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<SpotVideoDto>>), 200)]
		public async Task<ActionResult> GetSpotVideosOfSpot([FromRoute] string spotName,
													  [FromQuery] int take,
													  [FromQuery] int offset,
													  [FromQuery] Sorting sorting)
		{
			return Ok(new WithTotalCount<SpotVideoDto>
			{
				Data = await _mapper.ProjectTo<SpotVideoDto>(
				  _dbContext.SpotVideos
				 .Where(v => v.Spot.Name == spotName)
				 .ApplySort(sorting)
				 .Skip(offset)
				 .Take(take))
				.ToArrayAsync(),
				TotalCount = await _dbContext.SpotVideos
				 .Where(v => v.Spot.Name == spotName)
				 .CountAsync()
			});
		}

		[HttpPost("spots/{spotName}/spotVideos")]
		[MapRouteArgAndUserIdIntoBody(typeof(AddSpotVideoCommand))]
		[ProducesResponseType(200, Type = typeof(ApiResponse<SpotVideoDto>))]
		public async Task<ActionResult> AddSpotVideo([FromRoute] string spotName, [FromBody] AddSpotVideoCommand request)
		{
			return Ok(await _spotVideosService.AddSpotVideo(request));
		}

		[HttpDelete("spotVideos/{spotVideoId}")]
		public async Task<ActionResult> DeleteSpotVideo([FromRoute] DeleteSpotVideoCommand request)
		{
			request.UserId = User.GetUserId();
			await _spotVideosService.DeleteSpotVideo(request);
			return Ok();
		}
	}
}