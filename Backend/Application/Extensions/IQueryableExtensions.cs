using System;
using System.Linq;

namespace SkateSpot.Application.Extensions
{
	public static class IQueryableExtensions
	{
		public static IQueryable<ReturnT> ApplyFuncWithArgIfArgNotNull<ReturnT, ArgT>(
			this IQueryable<ReturnT> spot,
			ArgT filter,
			Func<IQueryable<ReturnT>, ArgT, IQueryable<ReturnT>> apply,
			Func<IQueryable<ReturnT>, IQueryable<ReturnT>> applyOtherwise = null
			) where ArgT : class
		{
			if (filter != null) return apply(spot, filter);
			else if (applyOtherwise != null) return applyOtherwise(spot);
			else return spot;
		}
	}
}