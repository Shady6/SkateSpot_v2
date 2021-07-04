using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Infrastructure.Repositories
{
	public class VerificationProcessRepository : Repository<VerificationProcess>, IVerificationProcessRepository
	{
		private readonly DbSet<VerificationProcess> VerificationProcesses;

		public VerificationProcessRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{
			VerificationProcesses = _dbContext.VerificationProcesses;
		}

		public async Task<VerificationProcess> GetWithVotesAsync(Guid id)
		{
			return await VerificationProcesses
				.Include(v => v.Votes)
				.FirstOrDefaultAsync(v => v.Id == id);
		}
	}
}