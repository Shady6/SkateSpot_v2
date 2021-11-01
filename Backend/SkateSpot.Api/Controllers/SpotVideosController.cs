using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Api.Attributes;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Infrastructure.DbContexts;
using System;
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
                                                    [FromQuery] int offset)
        {
            return Ok(new WithTotalCount<SpotVideoDto>
            {
                Data = await _mapper.ProjectTo<SpotVideoDto>(
                 _dbContext.SpotVideos                
                .Skip(offset)
                .Take(take)).ToArrayAsync(),
                TotalCount = await _dbContext.SpotVideos      
                .CountAsync()
            });
        }

        [AllowAnonymous]
        [HttpGet("spots/{spotName}/spotVideos")]
        [ProducesResponseType(typeof(ApiResponse<WithTotalCount<SpotVideoDto>>), 200)]
        public async Task<ActionResult> GetSpotVideosOfSpot([FromRoute] string spotName,
                                                      [FromQuery] int take,
                                                      [FromQuery] int offset)
        {
            return Ok(new WithTotalCount<SpotVideoDto>
            {
                Data = await _mapper.ProjectTo<SpotVideoDto>(
                  _dbContext.SpotVideos
                 .Where(v => v.Spot.Name == spotName)
                 .Skip(offset)
                 .Take(take)).ToArrayAsync(),
                TotalCount = await _dbContext.SpotVideos
                 .Where(v => v.Spot.Name == spotName)
                 .CountAsync()
            });
        }

        [HttpPost("spots/{spotName}/spotVideos")]
        [MapRouteArgAndUserIdIntoBody(typeof(AddSpotVideoCommand))]
        public async Task<ActionResult> AddSpotVideo([FromRoute] string spotName, [FromBody] AddSpotVideoCommand request)
        {
            await _spotVideosService.AddSpotVideo(request);
            return Ok();
        }

        [HttpDelete("spots/{spotId}/spotVideos/{spotVideoId}")]
        public async Task<ActionResult> DeleteSpotVideo([FromRoute] DeleteSpotVideoCommand request)
        {
            request.UserId = User.GetUserId();
            await _spotVideosService.DeleteSpotVideo(request);
            return Ok();
        }
    }
}