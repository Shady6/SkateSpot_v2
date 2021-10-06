using SkateSpot.Application.DTOs;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IGetterService
	{
		Task<WithTotalCount<TDto>> Get<TDto, TEntity>(int take, int offset)
			where TDto : class
			where TEntity : class;
	}
}
