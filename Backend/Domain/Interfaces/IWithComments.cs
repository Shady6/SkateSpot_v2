using SkateSpot.Domain.Models;
using System.Collections.Generic;

namespace SkateSpot.Domain.Interfaces
{
	public interface IWithComments
	{
		public ICollection<Comment> Comments { get; }
	}
}