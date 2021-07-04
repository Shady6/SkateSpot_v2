using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace SkateSpot.Application.DTOs.Identity
{
	public class ForgotPasswordRequest
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; }
	}
}