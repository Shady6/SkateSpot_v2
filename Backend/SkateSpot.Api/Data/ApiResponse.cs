namespace SkateSpot.Api.Data
{
	public class ApiResponse<TContent>
	{
		public TContent Content { get; set; }
		public ErrorResponse Error { get; set; }
	}
}
