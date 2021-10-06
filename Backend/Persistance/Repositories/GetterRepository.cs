using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Infrastructure.DbContexts;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Infrastructure.Repositories
{
	public class GetterRepository : IGetterRepository
	{
		protected readonly ApplicationDbContext _dbContext;

		public GetterRepository(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<WithTotalCount<T>> Get<T>(int take, int offset) where T : class
		{
			return new WithTotalCount<T>
			{
				TotalCount = await _dbContext.Set<T>()
				.AsNoTracking()
				.CountAsync(),

				Data = await _dbContext.Set<T>()
				.AsNoTracking()
				.Skip(offset)
				.Take(take)
				.ToArrayAsync()
			};
		}
	}
}