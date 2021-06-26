using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkateSpot.Application.DTOs.Errors;
using SkateSpot.Domain.Common;
using System.Net;

namespace SkateSpot.Api.Controllers.Common
{
	[ApiController]
	[ApiExplorerSettings(IgnoreApi = true)]
	public class ErrorsController : ControllerBase
	{
		[Route("error")]
		public ActionResult<SkateSpotError> GenerateErrorResponse()
		{
			var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
			var exception = context.Error;
			var httpCode = HttpStatusCode.InternalServerError;
			var skateSpotError = new SkateSpotError();

			skateSpotError.Message = exception.Message;
			if (exception is DomainException && ((DomainException)exception).ErrorCode != DomainErrorCode.DEFAULT_ERROR)
			{
				httpCode = HttpStatusCode.BadRequest;
				skateSpotError.ErrorCode = ((DomainException)exception).ErrorCode;
			}
			else
				throw exception;

			Response.StatusCode = (int)httpCode;

			return skateSpotError;
		}
	}
}