using System.Threading.Tasks;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface IAdminService
	{
		Task SeedFakeSpots(int count);
		Task SeedFakeTempSpots(int count);
	}
}
