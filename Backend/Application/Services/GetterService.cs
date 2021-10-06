using AutoMapper;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class GetterService : IGetterService
	{
		private readonly IGetterRepository _getterRepo;
		private readonly IMapper _mapper;

		public GetterService(IGetterRepository getterRepo)
		{
			_getterRepo = getterRepo;
		}

		public async Task<WithTotalCount<TDto>> Get<TDto, TEntity>(int take, int offset)
			where TDto : class
			where TEntity : class
		{
			var result = await _getterRepo.Get<TEntity>(take, offset);

			return new WithTotalCount<TDto>
			{
				Data = _mapper.Map<TDto[]>(result.Data),
				TotalCount = result.TotalCount
			};
		}
	}
}
