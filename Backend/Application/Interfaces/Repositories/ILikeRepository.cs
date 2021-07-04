using System;
using System.Threading.Tasks;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface ILikeRepository : IRepository<Like>
	{
		Task<BaseEntity> GetSubjectWithLikesAsync(SubjectType subjectType, Guid subjectId);
	}
}
