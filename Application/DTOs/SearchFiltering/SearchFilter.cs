namespace SkateSpot.Application.DTOs.SearchFiltering
{
	public class SearchFilter
	{
		public SortBy? SortBy { get; set; }
		public string Name { get; set; }
		public byte? MinSurfaceScore { get; set; }
		public byte? MaxSurfaceScore { get; set; }
		public AddressFilter AddressFilter { get; set; }
		public ObstaclesFilter ObstaclesFilter { get; set; }
		public Pagination Pagination { get; set; }
	}

	public class Pagination
	{
		public int Page { get; set; } = 1;
		public int PerPage { get; set; } = 10;
	}
}