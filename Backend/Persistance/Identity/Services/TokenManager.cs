using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using SkateSpot.Application.DTOs.Settings;
using SkateSpot.Application.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Infrastructure.Identity.Services
{
	public class TokenManager : ITokenManager
	{
		private readonly IDistributedCache _cache;
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IOptions<JWTSettings> _jwtSettings;

		public TokenManager(
			IDistributedCache cache,
			IHttpContextAccessor httpContextAccessor,
			IOptions<JWTSettings> jwtSettings)
		{
			_cache = cache;
			_httpContextAccessor = httpContextAccessor;
			_jwtSettings = jwtSettings;
		}

		public async Task DeactivateAsync(string token)
			=> await _cache.SetStringAsync(GetKey(token), " ", new DistributedCacheEntryOptions
			{
				AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(_jwtSettings.Value.DurationInMinutes)
			});

		public async Task DeactivateCurrentAsync()
			=> await DeactivateAsync(GetCurrentToken());

		public async Task<bool> IsActiveAsync(string token)
			=> await _cache.GetStringAsync(GetKey(token)) == null;

		public async Task<bool> IsCurrentActiveAsync()
			=> await IsActiveAsync(GetCurrentToken());

		private string GetCurrentToken()
		{
			var authHeader = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
			if (authHeader != StringValues.Empty && authHeader.Single().Split(' ').Count() == 2)
				return authHeader.Single().Split(' ').Last();
			return string.Empty;
		}


		private static string GetKey(string token)
			=> $"tokens:{token}:deactivated";
	}
}