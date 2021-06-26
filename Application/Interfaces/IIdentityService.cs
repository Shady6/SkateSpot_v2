using SkateSpot.Application.DTOs.Identity;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces
{
	public interface IIdentityService
	{
		Task<TokenResponse> GetTokenAsync(TokenRequest request, string ipAddress);

		Task<string> RegisterAsync(RegisterRequest request, string origin);

		Task<string> ConfirmEmailAsync(string userId, string code);

		Task ForgotPassword(ForgotPasswordRequest model, string origin);

		Task<string> ResetPassword(ResetPasswordRequest model);
	}
}