using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.DbContexts;

namespace SkateSpot.Infrastructure.Repositories
{
	public class LikeRepository : Repository<Like>, ILikeRepository
	{
		public LikeRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{
		}

		public async Task<BaseEntity> GetSubjectWithLikesAsync(SubjectType subjectType, Guid subjectId)
		{
			switch (subjectType)
			{
				case SubjectType.Spot:
					return await _dbContext.Spots						
						.Include(s => s.Likes)
						.FirstOrDefaultAsync(s => s.Id == subjectId);

				case SubjectType.SpotVideo:
					return await _dbContext.SpotVideos
						.Include(s => s.Likes)
						.FirstOrDefaultAsync(s => s.Id == subjectId);

				case SubjectType.Comment:
					var comment = await _dbContext.Comments
						.Include(d => d.Likes)
						.FirstOrDefaultAsync(s => s.Id == subjectId);
					return comment;
			}

			return null;
		}
	}
}