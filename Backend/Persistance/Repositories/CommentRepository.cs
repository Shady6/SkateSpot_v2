using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Infrastructure.Repositories
{

	public class CommentRepository : Repository<Comment>, ICommentRepository
	{
		public CommentRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{
		}

		public async Task<BaseEntity> GetSubjectAsync(SubjectType subjectType, Guid subjectId)
		{
			switch (subjectType)
			{
				case SubjectType.Spot:
					return await _dbContext.Spots.FindAsync(subjectId);

				case SubjectType.SpotVideo:
					return await _dbContext.SpotVideos.FindAsync(subjectId);

				case SubjectType.TempSpot:
					return await _dbContext.VerificationProcesses
						.Where(v => EF.Property<Guid>(v, "TempSpotId") == subjectId)
						.FirstOrDefaultAsync();
			}

			return null;
		}

		public async Task<BaseEntity> GetSubjectWithCommentsAsync(SubjectType subjectType, Guid subjectId)
		{
			switch (subjectType)
			{
				case SubjectType.Spot:
					return await _dbContext.Spots
						.Include(s => s.Comments)
						.FirstOrDefaultAsync(s => s.Id == subjectId);

				case SubjectType.SpotVideo:
					return await _dbContext.SpotVideos
						.Include(s => s.Comments)
						.FirstOrDefaultAsync(s => s.Id == subjectId);

				case SubjectType.TempSpot:
					return await _dbContext.VerificationProcesses
						.Include(t => t.Comments)
						.Where(v => EF.Property<Guid>(v, "TempSpotId") == subjectId)
						.FirstOrDefaultAsync();

			}

			return null;
		}

		// not used now
		//public override async Task<Comment> Add(Comment entity)
		//{
		//	string shadowPropertyForeignKey = entity.SubjectType.ToString() + "Id";
		//	_dbContext.Entry(entity).Property(shadowPropertyForeignKey).CurrentValue = entity.SubjectId;
		//	return await base.Add(entity);
		//}

		//public override Task<int> SaveChanges()
		//{
		//	var entries = _dbContext.ChangeTracker
		//				 .Entries()
		//				 .Where(e =>
		//	 e.State == EntityState.Added
		//	 || e.State == EntityState.Modified);

		//	foreach (var entityEntry in entries)
		//	{
		//		var entity = ((Comment)entityEntry.Entity);
		//		string shadowPropertyForeignKey = entity.SubjectType.ToString() + "Id";
		//		entityEntry.Property(shadowPropertyForeignKey).CurrentValue = entity.SubjectId;
		//	}
		//	return base.SaveChanges();
		//}
	}
}