using Microsoft.AspNetCore.Identity;

namespace SkateSpot.Infrastructure.Identity.Models
{
	public class ApplicationUser : IdentityUser
	{
		public byte[] ProfilePicture { get; set; }		
	}
}