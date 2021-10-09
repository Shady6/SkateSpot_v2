using AutoMapper;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class GetterService<TEntity> : IGetterService<TEntity>
		where TEntity : class
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
				Data = _mapper.Map<TDto[]>(result.Data),
				TotalCount = result.TotalCount
			};
		}
	}
}
