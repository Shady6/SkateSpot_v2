using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Features.UserFeatures.Commands
{
	public class CreateUserCommand : IRequest
	{
		public Guid Id { get; set; }
		public string UserName { get; set; }
		public string Email { get; set; }

		public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
		{			
			private readonly IUserRepository _userRepository;

			public CreateUserCommandHandler(IUserRepository userRepository)
			{				
				_userRepository = userRepository;
			}

			public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
			{
				User user = new User(request.Id, request.Email, request.UserName);

				await _userRepository.AddAsync(user);
				await _userRepository.SaveChangesAsync();

				return Unit.Value;
			}
		}
	}
}