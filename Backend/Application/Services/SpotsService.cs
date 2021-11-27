using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.Filter;
using SkateSpot.Application.Extensions;
using SkateSpot.Application.Features.SpotFeatures.Commands;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class SpotsService : Service, ISpotsService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly ITempSpotRepository _tempSpotRepository;
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;

		public SpotsService(ISpotRepository spotRepository,
					  IMapper mapper,
					  ITempSpotRepository tempSpotRepository,
					  IApplicationDbContext context)
		{
			_spotRepository = spotRepository;
			_mapper = mapper;
			_tempSpotRepository = tempSpotRepository;
			_context = context;
		}

		public async Task<List<SpotMarkerDataDto>> GetPermaAndTempSpotsMarkerData(Filtering filtering)
		{
			IQueryable<ISpot> permaSpots = (IQueryable<ISpot>)_spotRepository.GetSpots().ApplyFilters(filtering);
			IQueryable<ISpot> tempSpots = (IQueryable<ISpot>)_tempSpotRepository.GetTempSpots()
				.Where(s => s.VerificationProcess.EndDate > DateTime.Now)
				.ApplyFilters(filtering);

			var mappedPermaSpots = await _mapper.ProjectTo<SpotMarkerDataDto>(permaSpots).ToListAsync();
			var mappedTempSpots = await _mapper.ProjectTo<SpotMarkerDataDto>(tempSpots).ToListAsync();

			return mappedPermaSpots.Concat(mappedTempSpots).ToList();
		}

		public async Task DeleteSpot(DeleteSpotCommand request)
		{
			var foundSpot = await ThrowOnNullAsync(() =>
				_context.Spots.FirstOrDefaultAsync(s => s.Id == request.Id));

			if (foundSpot.AuthorId != request.UserId)
				throw new AppException(ErrorCode.NOT_OWNED, "You can't delete spot which doesn't belong to you");

			_context.Spots.Remove(foundSpot);
			await _context.SaveChangesAsync();
		}

		private void VerifyImagesOnTimerElapsed(IServiceScope scope, Guid ownerId)
		{
			var spotRepository = (ISpotRepository)scope.ServiceProvider.GetService(typeof(ISpotRepository));
			var spot = spotRepository.GetWithImagesVerifications(ownerId);
			spot.HandleImagesVerificationEnd();
			spotRepository.SaveChanges();
		}
	}
}