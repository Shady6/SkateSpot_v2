using SkateSpot.Domain.Models;
using System.Linq;

namespace SkateSpot.Domain.Factories
{
	public class SpotFactory
	{
		public static Spot CreateFromTempSpot(TempSpot tempSpot)
		{
			var historicalComments = tempSpot.VerificationProcess.Discussion.Select(c =>
				new HistoricalComment(c)).ToList();

			var historicalVerificationStatements = tempSpot.VerificationProcess.Votes.Select(v =>
				new HistoricalVerificationStatement(v)).ToList();

			var historicalVerificationProcess =
				new HistoricalVerificationProcess(tempSpot.VerificationProcess.CreatedAt,
																		 tempSpot.VerificationProcess.EndDate,
																		 historicalVerificationStatements,
																		 historicalComments);

			var spotImages = tempSpot.Images.Select(i =>
				new SpotImage(i)).ToList();

			var spot = new Spot(tempSpot.CreatedAt,
					   tempSpot.Name,
					   tempSpot.Description,
					   tempSpot.SurfaceScore,
					   tempSpot.AuthorId,
					   tempSpot.Address,
					   tempSpot.Obstacles.Select(o => o.ObstacleType).ToHashSet(),
					   historicalVerificationProcess,
					   spotImages
					   );

			return spot;
		}
	}
}