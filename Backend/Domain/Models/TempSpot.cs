using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Models
{
	public class TempSpot : BaseEntity, ISpot
	{
		public string Name { get; protected set; }
		public string Description { get; protected set; }
		public Address Address { get; protected set; }
		public byte SurfaceScore { get; protected set; }
		public Obstacles Obstacles { get; protected set; }
		public Guid? AuthorId { get; protected set; }
		public User Author { get; protected set; }
		public VerificationProcess VerificationProcess { get; protected set; }
		public ICollection<Image> Images { get; protected set; } = new List<Image>();

		public TempSpot()
		{
		}

		public TempSpot(string name,
				  string description,
				  byte surfaceScore,
				  Guid userId,
				  Address address,
				  Obstacles obstacles,
				  ICollection<Image> images)
		{
			Name = name;
			Description = description;
			SurfaceScore = surfaceScore;
			AuthorId = userId;
			Address = address;
			Obstacles = obstacles;
			Images = images;

			VerificationProcess = new VerificationProcess();
			VerificationProcess.Vote(userId, true);
		}
	}
}