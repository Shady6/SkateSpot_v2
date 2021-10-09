using SkateSpot.Domain.Common;

namespace SkateSpot.Domain.Models
{
	public class ObstacleTypeObj
	{
		public ObstacleType ObstacleType { get; protected set; }

		public ObstacleTypeObj()
		{

		}

		public ObstacleTypeObj(ObstacleType obstacleType)
		{
			ObstacleType = obstacleType;
		}
	}
}