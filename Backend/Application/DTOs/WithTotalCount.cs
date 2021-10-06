namespace SkateSpot.Application.DTOs
{
	public class WithTotalCount<T> where T : class
	{
		public T[] Data { get; set; }
		public int TotalCount { get; set; }
	}
}