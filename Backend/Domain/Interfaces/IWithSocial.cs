using System;

namespace SkateSpot.Domain.Interfaces
{
	public interface IWithSocial : IWithLikes, IWithComments
	{
		public Guid Id { get; }
	}
}