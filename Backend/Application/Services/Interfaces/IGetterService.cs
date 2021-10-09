using SkateSpot.Application.DTOs;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IGetterService<TEntity> where TEntity : class
	{
		Task<WithTotalCount<TDto>> Get<TDto>(int take, int offset)
			where TDto : class;
	}
}
