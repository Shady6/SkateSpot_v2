using SkateSpot.Domain.Common;
using System;

namespace SkateSpot.Domain.Models
{
	public class VerificationStatement : BaseEntity
	{
		public Guid VoterId { get; protected set; }
		public User Voter { get; protected set; }
		public bool IsReal { get; protected set; }

		
		public bool VoteChanged { get; private set; } = true;

		public VerificationStatement(Guid voterId, bool isReal)
		{
			VoterId = voterId;
			IsReal = isReal;
		}

		public void SetIsReal(bool isReal)
		{
			VoteChanged = isReal != IsReal;
			IsReal = isReal;
		}
	}
}