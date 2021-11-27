using System;
using System.Collections.Generic;
using System.Linq;

namespace SkateSpot.Domain.Models
{
	public partial class TempSpot : IFilteredSpot
	{
		public ICollection<Comment> Comments => VerificationProcess.Discussion;

		public ICollection<Like> Likes => (List<Like>)VerificationProcess.Votes.Select(v => new Like(Guid.Empty, Common.SubjectType.TempSpot, v.IsReal));
	}	
}