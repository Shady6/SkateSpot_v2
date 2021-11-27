using SkateSpot.Application.DTOs.Filter;
using SkateSpot.Domain.Models;
using System;
using System.Linq;

namespace SkateSpot.Application.Extensions
{
	public static class IQueryableSpotFilteredSpotExtensions
	{
		public static IQueryable<IFilteredSpot> ApplySort(
			this IQueryable<IFilteredSpot> spot,
			Sorting sorting) => sorting switch
			{
				{ Ascending: false, Option: SortOption.CREATION_DATE } => spot.OrderByDescending(s => s.CreatedAt),
				{ Ascending: true, Option: SortOption.CREATION_DATE } => spot.OrderBy(s => s.CreatedAt),
				{ Ascending: false, Option: SortOption.COMMENTS } => spot.OrderByDescending(s => s.Comments.Count()),
				{ Ascending: true, Option: SortOption.COMMENTS } => spot.OrderBy(s => s.Comments.Count()),
				{ Ascending: false, Option: SortOption.LIKES } => spot.OrderByDescending(s => s.Likes.Count()),
				{ Ascending: true, Option: SortOption.LIKES } => spot.OrderBy(s => s.Likes.Count()),
				_ => spot
			};

		public static IQueryable<IFilteredSpot> ApplyFilters(
			this IQueryable<IFilteredSpot> spot,
			Filtering filter) => spot
			.ApplyFuncWithArgIfArgNotNull(filter.SurfaceFilter, ApplySurfaceScoreFilter)
			.ApplyFuncWithArgIfArgNotNull(filter.ObstaclesFilter, ApplyObstaclesFilter);

		public static IQueryable<IFilteredSpot> ApplySurfaceScoreFilter(
			this IQueryable<IFilteredSpot> spot,
			SurfaceFilter filter) => filter.GreaterThan switch
			{
				true => spot.Where(s => s.SurfaceScore >= filter.Score),
				false => spot.Where(s => s.SurfaceScore < filter.Score),
			};

		public static IQueryable<IFilteredSpot> ApplyObstaclesFilter(
			this IQueryable<IFilteredSpot> spot,
			ObstaclesFilter filter) => spot.Where(s =>
			s.Obstacles.Where(o => filter.Obstacles.Contains(o.ObstacleType)).Count() ==
			filter.Obstacles.Length);

		public static IQueryable<IFilteredSpot> ApplySortingAndFilters(
			this IQueryable<IFilteredSpot> spot,
			SortAndFilter snf) => spot.ApplyFuncWithArgIfArgNotNull(snf.Sorting, ApplySort,
				(s) => s.ApplySort(new Sorting
				{
					Ascending = false,
					Option = SortOption.CREATION_DATE
				}))
			.ApplyFuncWithArgIfArgNotNull(snf.Filtering, ApplyFilters);
	}
}