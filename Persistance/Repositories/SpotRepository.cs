using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;

namespace SkateSpot.Infrastructure.Repositories
{
	public class SpotRepository : Repository<Spot>, ISpotRepository
	{
		private readonly DbSet<Spot> Spots;

		public SpotRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{
			Spots = _dbContext.Spots;
		}
		
		public IQueryable<Spot> GetSpots()
		{
			return Spots.
				Include(s => s.Author)
				.Include(s => s.Likes)
				.Include(s => s.Comments).ThenInclude(c => c.Author)
				.Include(s => s.Comments).ThenInclude(c => c.Likes);			
		}		

		public async Task<Spot> FindByNameAsync(string name)
		{
			return await Spots.FirstOrDefaultAsync(s => s.Name == name);
		}
	}
}