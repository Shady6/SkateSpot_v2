using System;
using MediatR;
using Newtonsoft.Json;

namespace SkateSpot.Application.Features
{
	public abstract class AuthorizedCommand
	{
		[JsonIgnore]
		public Guid UserId { get; set; }
	}
}