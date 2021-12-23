using Microsoft.EntityFrameworkCore;
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
		ITempSpotRepository
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
				.Include(s => s.VerificationProcess.Comments)
				.ThenInclude(d => d.Likes)
				.FirstOrDefault(s => s.Id == id);
		}

		public async Task<TempSpot> GetFullWithIdsAsync(Guid id)
		{
			return await TempSpots
				.Include(s => s.VerificationProcess.Votes)
				.Include(s => s.VerificationProcess.Comments)
				.ThenInclude(d => d.Likes)
				.FirstOrDefaultAsync(s => s.Id == id);
		}

		public async Task<TempSpot> GetFullWithEntitiesAsync(Guid id)
		{
			return await TempSpots
				.Include(s => s.Author)
				.Include(s => s.VerificationProcess.Votes)
				.Include(s => s.VerificationProcess.Comments).ThenInclude(d => d.Likes)
				.Include(s => s.VerificationProcess.Comments).ThenInclude(d => d.Author)
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
	}
}