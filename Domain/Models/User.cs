using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Models
{
	public class User : BaseEntity
	{
		public string Email { get; protected set; }
		public string UserName { get; protected set; }
		public List<Spot> AddedSpots { get; protected set; }
		public List<TempSpot> CurrentAddedTempSpots { get; protected set; }
		public List<Like> GivenLikes { get; protected set; }
		public List<Comment> PostedComments { get; protected set; }
		public List<VerificationStatement> CurrentSpotsVerifications { get; protected set; }
		public List<HistoricalVerificationStatement> SuccessfulSpotsVerifications { get; protected set; }
		public List<HistoricalComment> SuccessfulSpotsVerificationsComments { get; protected set; }
		public List<SpotVideo> AddedVideos { get; protected set; }

		public User()
		{
		}

		public User(Guid id, string email, string userName)
		{
			Id = id;
			Email = email;
			UserName = userName;
		}
	}
}