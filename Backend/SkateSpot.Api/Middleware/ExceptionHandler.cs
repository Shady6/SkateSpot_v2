using Microsoft.AspNetCore.Http;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using SkateSpot.Domain.Common;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace SkateSpot.Api.Middleware
{

	public class ExceptionHandler
	{
		private readonly RequestDelegate next;

		public ExceptionHandler(RequestDelegate next)
		{
			this.next = next;
		}

		public async Task Invoke(HttpContext context)
		{
			try
			{
				await next(context);
			}
			catch (Exception exception)
			{
				await HandleExceptionAsync(context, exception);
				throw exception;
			}
		}

		private async Task HandleExceptionAsync(HttpContext context, Exception exception)
		{
			var errorCode = ErrorCode.DEFAULT_ERROR;
			AppException appEx = null;
			if (exception is AppException)
			{
				appEx = (AppException)exception;
				errorCode = appEx.ErrorCode;
				context.Response.StatusCode = appEx.ErrorCode switch
				{
					ErrorCode.CANT_DO_THAT or
					ErrorCode.NOT_OWNED or
					ErrorCode.EMAIL_NOT_VERIFIED => (int)HttpStatusCode.Forbidden,
					ErrorCode.DOESNT_EXIST => (int)HttpStatusCode.NotFound,
					_ => (int)HttpStatusCode.BadRequest
				};
			}
			else
				context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

			await context.Response.WriteAsync(
				new ErrorResponse
				{
					Message = appEx is null ? "Something went wrong." : exception.Message,
					StatusCode = errorCode,
					Data = appEx?.Data,
					DeveloperMessage = $"{exception.Message}\n" +
					$"{exception.InnerException?.Message ?? ""}\n" +
					$"{exception.StackTrace} \n" +
					$"{exception.InnerException?.StackTrace ?? ""}"
				}.JsonStringify());
		}
	}
}
