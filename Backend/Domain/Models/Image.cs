namespace SkateSpot.Domain.Models
{
	public class Image
	{
		public string Url { get; protected set; }

		public Image()
		{
		}

		public Image(string url)
		{
			Url = url;
		}
	}
}