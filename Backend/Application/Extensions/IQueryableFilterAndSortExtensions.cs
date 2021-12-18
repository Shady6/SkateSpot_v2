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
			Sorting sorting) => (sorting, spot) switch
			{
				({ Ascending: false, Option: SortOption.CREATION_DATE }, IQueryable<BaseEntity> be) => (IQueryable<T>)be.OrderByDescending(s => s.CreatedAt),
				({ Ascending: true, Option: SortOption.CREATION_DATE }, IQueryable<BaseEntity> be) => (IQueryable<T>)be.OrderBy(s => s.CreatedAt),
				({ Ascending: false, Option: SortOption.COMMENTS }, IQueryable<TempSpot> tempSpots) => (IQueryable<T>)tempSpots.OrderByDescending(s => s.VerificationProcess.Discussion.Count()),
				({ Ascending: true, Option: SortOption.COMMENTS }, IQueryable<TempSpot> tempSpots) => (IQueryable<T>)tempSpots.OrderBy(s => s.VerificationProcess.Discussion.Count()),
				({ Ascending: false, Option: SortOption.COMMENTS }, IQueryable<IWithComments> withComments) => (IQueryable<T>)withComments.OrderByDescending(s => s.Comments.Count()),
				({ Ascending: true, Option: SortOption.COMMENTS }, IQueryable<IWithComments> withComments) => (IQueryable<T>)withComments.OrderBy(s => s.Comments.Count()),
				({ Ascending: false, Option: SortOption.LIKES }, IQueryable<TempSpot> tempSpots) => (IQueryable<T>)tempSpots.OrderByDescending(s => s.VerificationProcess.Votes.Count(v => v.IsReal)),
				({ Ascending: true, Option: SortOption.LIKES }, IQueryable<TempSpot> tempSpots) => (IQueryable<T>)tempSpots.OrderBy(s => s.VerificationProcess.Votes.Count(v => v.IsReal)),
				({ Ascending: false, Option: SortOption.LIKES }, IQueryable<IWithLikes> withLikes) => (IQueryable<T>)withLikes.OrderByDescending(s => s.Likes.Count(l => l.Positive)),
				({ Ascending: true, Option: SortOption.LIKES }, IQueryable<IWithLikes> withLikes) => (IQueryable<T>)withLikes.OrderBy(s => s.Likes.Count(l => l.Positive)),
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
			SortAndFilter snf) where T : BaseEntity, ISpot => spot.ApplyFuncWithArgIfArgNotNull(snf.Sorting, ApplySort,
				(s) => s.ApplySort(new Sorting
				{
					Ascending = false,
					Option = SortOption.CREATION_DATE
				}))
			.ApplyFuncWithArgIfArgNotNull(snf.Filtering, ApplyFilters);
	}
}