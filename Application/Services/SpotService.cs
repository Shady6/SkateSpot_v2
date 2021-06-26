using System;
using System.Collections.Generic;
using System.Linq;
using AutoBogus;
using AutoMapper;
using Bogus;
using Bogus.Extensions;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.DTOs.SearchFiltering;
using SkateSpot.Application.Features.SpotFeatures.Queries;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;

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

	public class SpotService : ISpotService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly IMapper _mapper;

		public SpotService(ISpotRepository spotRepository, IMapper mapper)
		{
			_spotRepository = spotRepository;
			_mapper = mapper;
		}

		public List<SpotDto> GetSpots(GetSpotsQuery request)
		{
			_spotRepository.AddRange(SeedData.CreateSpots().ToArray());
			_spotRepository.SaveChanges();

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


	// move this later somewhere else
	public static class SeedData
	{
		public static List<Spot> CreateSpots()
		{
			var userFake = new Faker<User>()
				.RuleFor(u => u.Id, f => f.Random.Guid())
				.RuleFor(u => u.CreatedAt, f => f.Date.Between(DateTime.Now.AddYears(-2), DateTime.Now))
				.RuleFor(u => u.Email, f => f.Internet.Email())
				.RuleFor(u => u.UserName, f => f.Name.FirstName() + f.Random.Number(1000000000));

			var users = userFake.Generate(100);

			var likeFake = new Faker<Like>()
				.RuleFor(l => l.Giver, f => f.PickRandom(users));

			var commentFake = new Faker<Comment>()
				.RuleFor(c => c.Author, f => f.PickRandom(users))
				.RuleFor(c => c.Text, f => f.Lorem.Lines(1))
				.RuleFor(c => c.Likes, (f, c) =>
				{
					likeFake.RuleFor(l => l.SubjectType, _ => SubjectType.Comment);
					likeFake.RuleFor(l => l.CreatedAt, f => f.Date.Between(c.CreatedAt, DateTime.Now));
					return likeFake.GenerateBetween(0, 5);
				});

			var spotVideoFake = new Faker<SpotVideo>()
				.RuleFor(s => s.Url, f => f.Internet.Url())
				.RuleFor(s => s.Author, f => f.PickRandom(users))
				.RuleFor(s => s.Comments, (f, s) =>
				{
					commentFake.RuleFor(c => c.SubjectType, _ => SubjectType.SpotVideo);
					commentFake.RuleFor(c => c.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));

					return commentFake.GenerateBetween(0, 7);
				})
				.RuleFor(s => s.Likes, (f, s) =>
				{
					likeFake.RuleFor(l => l.SubjectType, _ => SubjectType.SpotVideo);
					likeFake.RuleFor(l => l.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));
					return likeFake.GenerateBetween(0, 8);
				});

			var addressFake = new Faker<Address>()
				.RuleFor(a => a.City, f => f.Address.City())
				.RuleFor(a => a.Street, f => f.Address.StreetName())
				.RuleFor(a => a.Country, f => f.Address.Country())
				.RuleFor(a => a.PostalCode, f => f.Address.ZipCode())
				.RuleFor(a => a.Latitude, f => f.Address.Latitude().ToString())
				.RuleFor(a => a.Longitude, f => f.Address.Longitude().ToString());

			var spotFake = new Faker<Spot>()
				.RuleFor(s => s.Id, f => f.Random.Guid())
				.RuleFor(s => s.CreatedAt, f => f.Date.Between(DateTime.Now.AddYears(-2), DateTime.Now))
				.RuleFor(s => s.Name, f => f.Random.Guid().ToString())
				.RuleFor(s => s.Description, f => f.Lorem.Lines(1))
				.RuleFor(s => s.Address, _ => addressFake.Generate())
				.RuleFor(s => s.Obstacles, f => AutoFaker.Generate<Obstacles>())
				.RuleFor(s => s.SurfaceScore, f => (byte)f.Random.Number(0, 10))
				.RuleFor(s => s.Author, f => f.PickRandom(users))
				.RuleFor(s => s.Videos, (f, s) =>
				{
					spotVideoFake.RuleFor(sv => sv.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));

					return spotVideoFake.GenerateBetween(0, 4);
				})
				.RuleFor(s => s.Comments, (f, s) =>
				{
					commentFake.RuleFor(c => c.SubjectType, _ => SubjectType.Spot);
					commentFake.RuleFor(c => c.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));

					return commentFake.GenerateBetween(0, 10);
				})
				.RuleFor(s => s.Likes, (f, s) =>
				{
					likeFake.RuleFor(l => l.SubjectType, _ => SubjectType.Spot);
					commentFake.RuleFor(l => l.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));
					return likeFake.GenerateBetween(0, 14);
				});

			return spotFake.Generate(100);
		}
	}
}