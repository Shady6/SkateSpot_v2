using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public abstract class Service : IService
	{
		public static async Task<TResult> ThrowOnNullAsync<TResult>(Func<Task<TResult>> func)
		{
			var result = await func();
			if (result == null)
				throw new AppException(ErrorCode.DOESNT_EXIST, "The object doesn't exist.");
			return result;
		}
	}
}