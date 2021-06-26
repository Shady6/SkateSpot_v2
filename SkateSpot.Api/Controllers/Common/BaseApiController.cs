using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Api.Extensions;
using SkateSpot.Application.Features;

namespace SkateSpot.Api.Controllers.Common
{
	[ApiController]
	[Route("api/[controller]")]
	public abstract class BaseApiController : ControllerBase
	{
		private IMediator _mediator;
		protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
		
		protected async Task SendAsync<TRequest>(TRequest request) where TRequest : IRequest
		{
			if (request is AuthorizedCommand _request)
				_request.UserId = User.GetUserId();
			await Mediator.Send(request);
		}

		protected async Task<TResponse> SendAsync<TResponse, TRequest>(TRequest request) where TRequest : IRequest<TResponse>
		{
			if (request is AuthorizedCommand _request)
				_request.UserId = User.GetUserId();
			return await Mediator.Send(request);
		}		
	}
}