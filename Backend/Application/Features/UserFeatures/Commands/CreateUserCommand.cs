using System;

namespace SkateSpot.Application.Features.UserFeatures.Commands
{
	public class CreateUserCommand
	{
		public Guid Id { get; set; }

		public string UserName { get; set; }

		public string Email { get; set; }
	}
}