using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface ILikeRepository : IRepository<Like>
	{
		Task<BaseEntity> GetSubjectWithLikesAsync(SubjectType subjectType, Guid subjectId);
	}
}
