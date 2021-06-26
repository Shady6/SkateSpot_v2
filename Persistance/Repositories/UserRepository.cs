using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;

namespace SkateSpot.Infrastructure.Repositories
{
	public class UserRepository : Repository<User>, IUserRepository
	{
		public UserRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{
			
		}
	}
}