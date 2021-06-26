using SkateSpot.Domain.Common;
using System;

namespace SkateSpot.Domain.Models
{
	public class HistoricalVerificationStatement : BaseEntity
	{
		public Guid VoterId { get; protected set; }
		public User Voter { get; protected set; }
		public bool IsReal { get; protected set; }

		public HistoricalVerificationStatement()
		{

		}

		public HistoricalVerificationStatement(VerificationStatement verificationStatement)
		{
			CreatedAt = verificationStatement.CreatedAt;
			VoterId = verificationStatement.VoterId;
			IsReal = verificationStatement.IsReal;
		}
	}
}