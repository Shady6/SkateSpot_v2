using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface ISpotRepository : IRepository<Spot>
	{
		Task<Spot> FindByNameAsync(string name);
		Spot GetWithImagesVerifications(Guid spotId);
		IQueryable<Spot> GetSpots();
	}
}
