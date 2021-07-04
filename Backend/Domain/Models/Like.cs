using SkateSpot.Domain.Common;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace SkateSpot.Domain.Models
{
	public class Like : BaseEntity
	{
		public Guid GiverId { get; protected set; }
		public User Giver { get; protected set; }
		public Guid SubjectId { get; protected set; }
		public SubjectType SubjectType { get; protected set; }

		public Like()
		{			
		}		

		public Like(Guid giverId, SubjectType subjectType)
		{
			GiverId = giverId;
			SubjectType = subjectType;
		}
	}
}