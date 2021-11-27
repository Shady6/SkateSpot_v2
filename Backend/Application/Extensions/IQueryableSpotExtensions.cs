using SkateSpot.Application.DTOs.Filter;
using SkateSpot.Domain.Models;
using System.Linq;

namespace SkateSpot.Application.Extensions
{
	public static class IQueryableSpotExtensions
	{
		public static IQueryable<Spot> ApplySpotSort(
			this IQueryable<Spot> spot,
			Sorting sorting) => sorting switch
			{
				{ Ascending: false, Option: SortOption.VIDEOS } => spot.OrderByDescending(s => s.Videos.Count()),
				{ Ascending: true, Option: SortOption.VIDEOS } => spot.OrderBy(s => s.Videos.Count()),
				_ => spot
			};
	}
}