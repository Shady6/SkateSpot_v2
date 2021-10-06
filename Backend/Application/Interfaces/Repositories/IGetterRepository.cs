using System.Threading.Tasks;
using SkateSpot.Application.DTOs;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface IGetterRepository
	{
		Task<WithTotalCount<T>> Get<T>(int take, int offset) where T : class;
	}
}
