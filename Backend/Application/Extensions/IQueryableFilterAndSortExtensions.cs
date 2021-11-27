using SkateSpot.Application.DTOs.Filter;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;
using SkateSpot.Domain.Models;
using System;
using System.Linq;

namespace SkateSpot.Application.Extensions
{
	public static class IQueryableFilterAndSortExtensions
	{
		public static IQueryable<T> ApplySort<T>(
			this IQueryable<T> spot,
			Sorting sorting) where T : BaseEntity, IWithSocial => sorting switch
			{
				{ Ascending: false, Option: SortOption.CREATION_DATE } => spot.OrderByDescending(s => s.CreatedAt),
				{ Ascending: true, Option: SortOption.CREATION_DATE } => spot.OrderBy(s => s.CreatedAt),
				{ Ascending: false, Option: SortOption.COMMENTS } => spot.OrderByDescending(s => s.Comments.Count()),
				{ Ascending: true, Option: SortOption.COMMENTS } => spot.OrderBy(s => s.Comments.Count()),
				{ Ascending: false, Option: SortOption.LIKES } => spot.OrderByDescending(s => s.Likes.Count()),
				{ Ascending: true, Option: SortOption.LIKES } => spot.OrderBy(s => s.Likes.Count()),
				_ => spot
			};

		public static IQueryable<T> ApplyFilters<T>(
			this IQueryable<T> spot,
			Filtering filter) where T : ISpot => spot
			.ApplyFuncWithArgIfArgNotNull(filter.SurfaceFilter, ApplySurfaceScoreFilter)
			.ApplyFuncWithArgIfArgNotNull(filter.ObstaclesFilter, ApplyObstaclesFilter);

		public static IQueryable<T> ApplySurfaceScoreFilter<T>(
			this IQueryable<T> spot,
			SurfaceFilter filter) where T : ISpot => filter.GreaterThan switch
			{
				true => spot.Where(s => s.SurfaceScore >= filter.Score),
				false => spot.Where(s => s.SurfaceScore < filter.Score),
			};

		public static IQueryable<T> ApplyObstaclesFilter<T>(
			this IQueryable<T> spot,
			ObstaclesFilter filter) where T : ISpot => spot.Where(s =>
			s.Obstacles.Where(o => filter.Obstacles.Contains(o.ObstacleType)).Count() ==
			filter.Obstacles.Length);

		public static IQueryable<T> ApplySortingAndFilters<T>(
			this IQueryable<T> spot,
			SortAndFilter snf) where T : BaseEntity, ISpot, IWithSocial => spot.ApplyFuncWithArgIfArgNotNull(snf.Sorting, ApplySort,
				(s) => s.ApplySort(new Sorting
				{
					Ascending = false,
					Option = SortOption.CREATION_DATE
				}))
			.ApplyFuncWithArgIfArgNotNull(snf.Filtering, ApplyFilters);
	}
}