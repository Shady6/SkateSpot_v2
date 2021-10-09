using System.Collections.Generic;

namespace SkateSpot.Application.DTOs
{
	public class WithTotalCount<T> where T : class
	{
		public IEnumerable<T> Data { get; set; }
		public int TotalCount { get; set; }
	}
}