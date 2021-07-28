namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class AddressDto
	{
		public string StreetName { get; set; }
		public string StreetNumber { get; set; }
		public string PostCode { get; set; }
		public string City { get; set; }
		public string Country { get; set; }
		public CoordsDto Coords { get; set; }
	}
}