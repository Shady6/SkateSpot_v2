using System;
using System.Linq;
using System.Threading.Tasks;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface ITempSpotRepository : IRepository<TempSpot>
	{
		Task<TempSpot> FindByNameAsync(string name);
		Task<TempSpot> GetFullWithEntitiesAsync(Guid id);
		TempSpot GetFullWithIds(Guid id);
		Task<TempSpot> GetFullWithIdsAsync(Guid id);
		IQueryable<TempSpot> GetTempSpots();
		Task<TempSpot> GetWithVerificationVotesAsync(Guid id);
	}
}
