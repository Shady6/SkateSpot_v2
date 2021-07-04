namespace SkateSpot.Domain.Models
{
	public class Obstacles
	{	
		public bool Ledge { get; protected set; }
		public bool Stairs { get; protected set; }
		public bool Quater { get; protected set; }
		public bool Kicker { get; protected set; }
		public bool Downhill { get; protected set; }
		public bool Rail { get; protected set; }
		public bool Bank { get; protected set; }
		public bool Flatground { get; protected set; }
		public bool Manualpad { get; protected set; }
		public bool Skatepark { get; protected set; }

		public Obstacles()
		{
		}

		public Obstacles(bool ledge, bool stairs, bool quater, bool kicker, bool downhill, bool rail, bool bank, bool flatground, bool manualpad, bool skatepark)
		{
			Ledge = ledge;
			Stairs = stairs;
			Quater = quater;
			Kicker = kicker;
			Downhill = downhill;
			Rail = rail;
			Bank = bank;
			Flatground = flatground;
			Manualpad = manualpad;
			Skatepark = skatepark;
		}
	}
}