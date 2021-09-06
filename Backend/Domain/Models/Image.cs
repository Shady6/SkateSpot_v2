namespace SkateSpot.Domain.Models
{
	public class Image
	{
		public string Base64 { get; protected set; }

		public Image()
		{
		}

		public Image(string url)
		{
			Base64 = url;
		}
	}
}