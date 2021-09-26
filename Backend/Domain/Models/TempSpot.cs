using SkateSpot.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SkateSpot.Domain.Models
{
	public class TempSpot : BaseEntity, ISpot
	{
		public string Name { get; protected set; }
		public string Description { get; protected set; }
		public Address Address { get; protected set; }
		public byte SurfaceScore { get; protected set; }
		public HashSet<ObstacleType> Obstacles { get; protected set; }
		public Guid? AuthorId { get; protected set; }
		public User Author { get; protected set; }
		public VerificationProcess VerificationProcess { get; protected set; }
		public ICollection<Image> Images { get; protected set; } = new List<Image>();

		private readonly int MaxImagesSizeInMb = 20;

		public TempSpot()
		{
		}

		public TempSpot(string name,
				  string description,
				  byte surfaceScore,
				  Guid userId,
				  Address address,
				  HashSet<ObstacleType> obstacles,
				  ICollection<Image> images)
		{
			Validate(name, description, address, obstacles, images);
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

		private void Validate(string name,
				  string description,
				  Address address,
				  HashSet<ObstacleType> obstacles,
				  ICollection<Image> images)
		{
			var sb = new StringBuilder();

			if (string.IsNullOrEmpty(name)) sb.Append("Name of the spot cannot be empty.\n");
			if (description.Length > 400) sb.Append("Name of the spot cannot be empty.\n");
			if (address == null) sb.Append("Address cannot be empty.\n");
			if (obstacles.Count == 0) sb.Append("List of obstacles cannot be empty.\n");
			if (images
				.Select(i => Encoding.ASCII.GetByteCount(i.Base64))
				.Sum() / 1024 / 1024 > MaxImagesSizeInMb)
				sb.Append($"Images total size has to be less than or equal to {MaxImagesSizeInMb}Mbs.\n");

			var error = sb.ToString();
			if (!string.IsNullOrEmpty(error)) throw new AppException(ErrorCode.BAD_INPUT, error);
		}
	}
}