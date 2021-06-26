namespace SkateSpot.Application.DTOs.SearchFiltering
{
	public class SpotSearchFilter : SearchFilter
	{
		public int? MinSpotVideosCount { get; set; }
		public int? MaxSpotVideosCount { get; set; }
	}
}