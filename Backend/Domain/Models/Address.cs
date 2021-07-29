namespace SkateSpot.Domain.Models
{
	public class Address
	{
		public string StreetName { get; protected set; }
		public string StreetNumber { get; protected set; }
		public string PostCode { get; protected set; }
		public string City { get; protected set; }
		public string Country { get; protected set; }
		public double Latitude { get; protected set; }
		public double Longitude { get; protected set; }

		public Address()
		{
		}

		public Address(string street, string postalCode, string city, string country, double latitude, double longitude)
		{
			StreetName = street;
			PostCode = postalCode;
			City = city;
			Country = country;
			Latitude = latitude;
			Longitude = longitude;
		}
	}
}