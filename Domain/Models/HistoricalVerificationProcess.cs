using System;
using System.Collections.Generic;
using SkateSpot.Domain.Common;

namespace SkateSpot.Domain.Models
{
	public class HistoricalVerificationProcess : BaseEntity
	{
		public List<HistoricalVerificationStatement> Votes { get; protected set; } = new List<HistoricalVerificationStatement>();
		public DateTime EndDate { get; protected set; }
		public List<HistoricalComment> Discussion { get; protected set; }

		public HistoricalVerificationProcess()
		{
		}

		public HistoricalVerificationProcess(DateTime createdAt,
									   DateTime endDate,
									   List<HistoricalVerificationStatement> votes,
									   List<HistoricalComment> discussion)
		{
			CreatedAt = createdAt;
			EndDate = endDate;
			Votes = votes;
			Discussion = discussion;
		}
	}
}