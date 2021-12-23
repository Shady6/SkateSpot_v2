using SkateSpot.Domain.Models;
using System;
using System.Linq;

namespace SkateSpot.Domain.Factories
{
	public class SpotFactory
	{
		public static Spot CreateFromTempSpot(TempSpot tempSpot)
		{
			var spotImages = tempSpot.Images.Select(i =>
				new SpotImage(i)).ToList();

			var spot = new Spot(tempSpot.CreatedAt,
					   tempSpot.Name,
					   tempSpot.Description,
					   tempSpot.SurfaceScore,
					   tempSpot.AuthorId,
					   tempSpot.Address,
					   tempSpot.Obstacles.Select(o => o.ObstacleType).ToHashSet(),
					   spotImages,
					   tempSpot.VerificationProcess.Votes.Select(v => new Like(v.VoterId, v.IsReal)).ToList(),
					   tempSpot.VerificationProcess.Comments.Select(c => new Comment(c.AuthorId, c.Text)).ToList()
					   );

			return spot;
		}
	}
}