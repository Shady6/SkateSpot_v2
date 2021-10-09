using SkateSpot.Application.DTOs;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface IGetListRepo<TEntity> where TEntity : class
	{
		Task<WithTotalCount<TEntity>> GetList(int take, int skip);
	}
}
