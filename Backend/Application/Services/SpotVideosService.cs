using AutoMapper;
using Microsoft.AspNetCore.Http;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
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

		public SpotVideosService(ISpotRepository spotRepository,
						   IHttpContextAccessor httpContextAccessor,
						   IMapper mapper)
		{
			_spotRepository = spotRepository;
			_httpContextAccessor = httpContextAccessor;
			_mapper = mapper;
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
			var foundSpot = await ThrowOnNullAsync(() => _spotRepository.GetByIdAsync(request.spotId));

			foundSpot.DeleteSpotVideo(request.spotVideoId, request.UserId);

			await _spotRepository.SaveChangesAsync();
		}
	}
}