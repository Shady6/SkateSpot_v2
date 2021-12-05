using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.UserRelatedFilter;
using SkateSpot.Application.Interfaces;
using SkateSpot.Domain.Models;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Api.Controllers
{
	[Route("api/user")]
	[ApiController]
	[Authorize]
	public class UserController : ControllerBase
	{
		private readonly IApplicationDbContext _context;
		private readonly IMapper _mapper;

		public UserController(IApplicationDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet("stats")]
		[ProducesResponseType(typeof(ApiResponse<UserStats>), 200)]
		public async Task<ActionResult> GetUserStats()
		{
			var userId = User.GetId();
			return Ok(new UserStats
			{
				SpotStats = new ItemStats
				{
					AddedCount = await _context.Spots.Where(s => s.AuthorId == userId).CountAsync(),
					CommentedCount = await _context.Spots.Where(s => s.Comments.Any(c => c.AuthorId == userId)).CountAsync(),
					LikedCount = await _context.Spots.Where(s => s.Likes.Any(l => l.GiverId == userId)).CountAsync()
				},
				SpotVideoStats = new ItemStats
				{
					AddedCount = await _context.SpotVideos.Where(s => s.AuthorId == userId).CountAsync(),
					CommentedCount = await _context.Spots.Where(s => s.Comments.Any(c => c.AuthorId == userId)).CountAsync(),
					LikedCount = await _context.SpotVideos.Where(s => s.Likes.Any(l => l.GiverId == userId)).CountAsync()
				},
			});
		}

		[HttpGet(nameof(UserInteractionListItem.Spots) + "/{interactionType}")]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<SpotDto>>), 200)]
		public async Task<ActionResult> GetUserRelatedSpots(
			[FromRoute] UserInteractionType interactionType,
			[FromQuery] int take,
			[FromQuery] int skip)
		{
			var userId = User.GetId();
			IQueryable<Spot> listItems = interactionType switch
			{
				UserInteractionType.Added => _context.Spots.Where(s => s.AuthorId == userId),
				UserInteractionType.Commented => _context.Spots.Where(s => s.Comments.Any(c => c.AuthorId == userId)),
				UserInteractionType.Liked => _context.Spots.Where(s => s.Likes.Any(l => l.GiverId == userId && l.Positive)),
			};
			var totalCount = await listItems.CountAsync();
			listItems = listItems.OrderByDescending(l => l.CreatedAt).Skip(skip).Take(take);

			return Ok(
				new WithTotalCount<SpotDto>
				{
					Data = await _mapper.ProjectTo<SpotDto>(listItems).ToArrayAsync(),
					TotalCount = totalCount
				}
			);
		}

		[HttpGet(nameof(UserInteractionListItem.Videos) + "/{interactionType}")]
		[ProducesResponseType(typeof(ApiResponse<WithTotalCount<SpotVideoDto>>), 200)]
		public async Task<ActionResult> GetUserRelatedSpotVideos(
			[FromRoute] UserInteractionType interactionType,
			[FromQuery] int take,
			[FromQuery] int skip)
		{
			var userId = User.GetId();
			IQueryable<SpotVideo> listItems = interactionType switch
			{
				UserInteractionType.Added => _context.SpotVideos.Where(s => s.AuthorId == userId),
				UserInteractionType.Commented => _context.SpotVideos.Where(s => s.Comments.Any(c => c.AuthorId == userId)),
				UserInteractionType.Liked => _context.SpotVideos.Where(s => s.Likes.Any(l => l.GiverId == userId && l.Positive)),
			};
			var totalCount = await listItems.CountAsync();
			listItems = listItems.OrderByDescending(l => l.CreatedAt).Skip(skip).Take(take);

			return Ok(
				new WithTotalCount<SpotVideoDto>
				{
					Data = await _mapper.ProjectTo<SpotVideoDto>(listItems).ToArrayAsync(),
					TotalCount = totalCount
				}
			);
		}
	}
}