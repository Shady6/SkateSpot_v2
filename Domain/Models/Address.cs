namespace SkateSpot.Domain.Models
{
	public class Address
	{
		public string Street { get; protected set; }
		public string PostalCode { get; protected set; }
		public string City { get; protected set; }
		public string Country { get; protected set; }
		public string Latitude { get; protected set; }
		public string Longitude { get; protected set; }

		public Address()
		{
		}

		public Address(string street, string postalCode, string city, string country, string latitude, string longitude)
		{
			Street = street;
			PostalCode = postalCode;
			City = city;
			Country = country;
			Latitude = latitude;
			Longitude = longitude;
		}
	}
}