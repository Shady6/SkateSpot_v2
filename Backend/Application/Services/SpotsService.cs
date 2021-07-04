using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.SearchFiltering;
using SkateSpot.Application.Features.SpotFeatures.Queries;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkateSpot.Application.Services
{
	public interface ISortingStrategy
	{
		public void Sort(IQueryable<Spot> spots);
	}

	public class SortingByNewest : ISortingStrategy
	{
		public void Sort(IQueryable<Spot> spots)
		{
			spots.OrderBy(s => s.CreatedAt);
		}
	}

	public class SortingByTopMonth : ISortingStrategy
	{
		public void Sort(IQueryable<Spot> spots)
		{
			spots.OrderBy(s => s.Likes.Where(l => DateTime.Now - l.CreatedAt < TimeSpan.FromDays(31)).Count());
		}
	}

	public class SortingStrategyFactory
	{
		public static ISortingStrategy GetSortingStrategy(SortBy? sortBy)
		{
			if (sortBy == SortBy.New)
				return new SortingByNewest();
			else if (sortBy == SortBy.TopMonth)
				return new SortingByTopMonth();
			return null;
		}
	}

	public class SpotsService : ISpotsService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly IMapper _mapper;

		public SpotsService(ISpotRepository spotRepository, IMapper mapper)
		{
			_spotRepository = spotRepository;
			_mapper = mapper;
		}

		public List<SpotDto> GetSpots(GetSpotsQuery request)
		{
			var spots = _spotRepository.GetSpots();

			// just testing strategy design pattern
			//ISortingStrategy strategy = SortingStrategyFactory.GetSortingStrategy(request.SpotSearchFilter.SortBy);
			//strategy.Sort(spots);

			var spotsDto = _mapper.ProjectTo<SpotDto>(spots).ToList();
			return spotsDto;
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