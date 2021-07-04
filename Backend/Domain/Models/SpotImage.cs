using SkateSpot.Domain.Common;

namespace SkateSpot.Domain.Models
{
	public class SpotImage : BaseEntity
	{
		public Image Image { get; protected set; }
		public Spot Spot { get; protected set; }

		public SpotImage()
		{
		}

		public SpotImage(Image image)
		{
			Image = image;
		}
	}
}