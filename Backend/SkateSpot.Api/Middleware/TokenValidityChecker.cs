using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using SkateSpot.Application.Interfaces;
using SkateSpot.Domain.Common;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Api.Middleware
{
	public class TokenValidityChecker
	{
		private readonly ITokenManager _tokenManager;
		private readonly RequestDelegate next;

		public TokenValidityChecker(RequestDelegate next, ITokenManager tokenManager)
		{
			_tokenManager = tokenManager;
			this.next = next;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			if (context.GetEndpoint() == null || !context.GetEndpoint().Metadata.Any(m => m is AuthorizeAttribute) || await _tokenManager.IsCurrentActiveAsync())
			{
				await next(context);
				return;
			}
			throw new AppException(ErrorCode.UNAUTHORIZED, "You're unauthorized, please login again");
		}
	}
}
