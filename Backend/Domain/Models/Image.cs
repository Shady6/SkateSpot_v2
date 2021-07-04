namespace SkateSpot.Domain.Models
{
	public class Image
	{
		public string Link { get; protected set; }

		public Image()
		{
		}

		public Image(string link)
		{
			Link = link;
		}
	}
}