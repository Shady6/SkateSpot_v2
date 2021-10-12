﻿using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Infrastructure.Repositories
{
	public class TempSpotRepository :
		Repository<TempSpot>,
		ITempSpotRepository,
		IGetListRepo<TempSpot>
	{
		private readonly DbSet<TempSpot> TempSpots;

		public TempSpotRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{
			TempSpots = _dbContext.TempSpots;
		}

		public TempSpot GetFullWithIds(Guid id)
		{
			return TempSpots
				.Include(s => s.VerificationProcess.Votes)
				.Include(s => s.VerificationProcess.Discussion)
				.ThenInclude(d => d.Likes)
				.FirstOrDefault(s => s.Id == id);
		}

		public async Task<TempSpot> GetFullWithIdsAsync(Guid id)
		{
			return await TempSpots
				.Include(s => s.VerificationProcess.Votes)
				.Include(s => s.VerificationProcess.Discussion)
				.ThenInclude(d => d.Likes)
				.FirstOrDefaultAsync(s => s.Id == id);
		}

		public async Task<TempSpot> GetFullWithEntitiesAsync(Guid id)
		{
			return await TempSpots
				.Include(s => s.Author)
				.Include(s => s.VerificationProcess.Votes)
				.Include(s => s.VerificationProcess.Discussion).ThenInclude(d => d.Likes)
				.Include(s => s.VerificationProcess.Discussion).ThenInclude(d => d.Author)
				.FirstOrDefaultAsync(s => s.Id == id);
		}

		public async Task<TempSpot> GetWithVerificationVotesAsync(Guid id)
		{
			return await TempSpots
				.Include(s => s.VerificationProcess.Votes)
				.FirstOrDefaultAsync(s => s.Id == id);
		}

		public async Task<TempSpot> FindByNameAsync(string name)
		{
			return await TempSpots.FirstOrDefaultAsync(s => s.Name == name);
		}

		public IQueryable<TempSpot> GetTempSpots()
		{
			return TempSpots;
		}

		public async Task<WithTotalCount<TempSpot>> GetList(int take, int skip)
		{
			return new WithTotalCount<TempSpot>
			{
				Data = await TempSpots
					.Skip(skip)
					.Take(take)
					.Include(s => s.Author)
					.Include(s => s.VerificationProcess).ThenInclude(v => v.Votes)
					.Include(s => s.Images)
					.Where(s => s.VerificationProcess.EndDate > DateTime.Now)
					.ToArrayAsync(),

				TotalCount = await TempSpots
				.Where(s => s.VerificationProcess.EndDate > DateTime.Now)
				.CountAsync()
			};
		}
	}
}