using SkateSpot.Domain.Models;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface IVerificationProcessRepository : IRepository<VerificationProcess>
	{
		Task<VerificationProcess> GetWithVotesAsync(Guid id);		
	}
}
