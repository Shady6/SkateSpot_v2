using SkateSpot.Domain.Common;
using System;

namespace SkateSpot.Domain.Models
{
	public class Like : BaseEntity
	{
		public Guid GiverId { get; protected set; }
		public User Giver { get; protected set; }				
		public bool Positive { get; protected set; }

		public Like()
		{
		}

		public Like(Guid giverId, bool positive)
		{
			GiverId = giverId;			
			Positive = positive;
		}

		public void SetIsPositive(bool positive)
		{
			Positive = positive;
		}
	}
}