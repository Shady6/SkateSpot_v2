using AutoMapper;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class GetterService<TEntity> : IGetterService<TEntity>
		where TEntity : BaseEntity
	{
		private readonly IGetListRepo<TEntity> _getterRepo;
		private readonly IMapper _mapper;

		public GetterService(IMapper mapper, IGetListRepo<TEntity> getterRepo)
		{
			_mapper = mapper;
			_getterRepo = getterRepo;
		}

		public async Task<WithTotalCount<TDto>> Get<TDto>(int take, int offset)
			where TDto : class
		{
			var result = await _getterRepo.GetList(take, offset);

			return new WithTotalCount<TDto>
			{
				Data = _mapper.Map<TDto[]>(result.Data.OrderBy(e => e.CreatedAt)),
				TotalCount = result.TotalCount
			};
		}
	}
}
