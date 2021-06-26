using System;
using System.Threading.Tasks;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface ICommentRepository : IRepository<Comment>
	{
		Task<BaseEntity> GetSubjectAsync(SubjectType subjectType, Guid subjectId);
		Task<BaseEntity> GetSubjectWithCommentsAsync(SubjectType subjectType, Guid subjectId);
	}
}
