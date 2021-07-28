using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces
{
	public interface ITokenManager
	{
		Task<bool> IsActiveAsync(string token);
		Task DeactivateAsync(string token);
		Task<bool> IsCurrentActiveAsync();
		Task DeactivateCurrentAsync();
	}
}