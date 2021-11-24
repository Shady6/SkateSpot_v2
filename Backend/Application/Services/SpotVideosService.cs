using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class SpotVideosService : Service, ISpotVideosService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;

		public SpotVideosService(ISpotRepository spotRepository,
						   IHttpContextAccessor httpContextAccessor,
						   IMapper mapper,
						   IApplicationDbContext context)
		{
			_spotRepository = spotRepository;
			_httpContextAccessor = httpContextAccessor;
			_mapper = mapper;
			_context = context;
		}

		public async Task<SpotVideoDto> AddSpotVideo(AddSpotVideoCommand request)
		{
			var foundSpot = await ThrowOnNullAsync(() => _spotRepository.FindByNameAsync(request.SpotName));

			var spotVideo = new SpotVideo(request.EmbedId, request.PlatformType, request.UserId, request.Description);
			foundSpot.AddSpotVideo(spotVideo);

			await _spotRepository.SaveChangesAsync();

			var dto = _mapper.Map<SpotVideoDto>(spotVideo);
			dto.Author = new SmallUserDto
			{
				UserName = _httpContextAccessor.HttpContext.User.Claims
				.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value,
				Id = request.UserId
			};
			dto.Spot = _mapper.Map<SmallSpotDto>(foundSpot);
			return dto;
		}

		public async Task DeleteSpotVideo(DeleteSpotVideoCommand request)
		{
			var foundSpot = await _context.Spots
				   .Include(s => s.Videos)
				   .FirstOrDefaultAsync(s =>
					   s.Videos.Any(v => v.Id == request.spotVideoId));

			SpotVideo foundVideo = null;
			if (foundSpot != null)
				foundVideo = foundSpot.DeleteSpotVideo(request.spotVideoId, request.UserId);

			foundVideo ??= await ThrowOnNullAsync(() =>
					_context.SpotVideos
					.Include(s => s.Spot)
					.FirstOrDefaultAsync(s => s.Id == request.spotVideoId));

			if (foundVideo.AuthorId != request.UserId)
				throw new AppException(ErrorCode.NOT_OWNED, "You don't own this video.");

			_context.SpotVideos.Remove(foundVideo);

			await _context.SaveChangesAsync();
		}
	}
}