using System;
using System.Linq;
using System.Security.Claims;

namespace SkateSpot.Api.Extensions
{
	public static class ClaimsPrincipalExtensions
	{
		public static Guid GetId(this ClaimsPrincipal user)
		{
			return Guid.Parse(user.Claims.First(c => c.Type == "uid").Value);
		}
	}
}