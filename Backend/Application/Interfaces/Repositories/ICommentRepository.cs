using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface ICommentRepository : IRepository<Comment>
	{
		Task<BaseEntity> GetSubjectAsync(SubjectType subjectType, Guid subjectId);

		Task<BaseEntity> GetSubjectWithCommentsAsync(SubjectType subjectType, Guid subjectId);
	}
}