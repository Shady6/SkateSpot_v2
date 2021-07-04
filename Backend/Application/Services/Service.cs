using System;
using System.Threading.Tasks;
using SkateSpot.Application.Services.Common;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Application.Services
{
	public abstract class Service : IService
	{
		protected async Task<TResult> ThrowOnNullAsync<TResult>(Func<Task<TResult>> func)
		{
			var result = await func();
			if (result == null)
				throw new ServiceException(ServiceErrorCode.DOESNT_EXIST, "The object doesn't exist.");
			return result;
		}
	}
}