using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using SkateSpot.Api.Data;
using SkateSpot.Api.Extensions;
using System.IO;
using System.Threading.Tasks;

namespace SkateSpot.Api.Middleware
{
	public class ToApiResponseConverter
	{
		private readonly RequestDelegate next;

		public ToApiResponseConverter(RequestDelegate next)
		{
			this.next = next;
		}

		public async Task Invoke(HttpContext context)
		{
			var originalBody = context.Response.Body;
			var isErrorResponse = false;
			using (var memoryStream = new MemoryStream())
			{
				context.Response.Body = memoryStream;
				try
				{
					await next(context);
				}
				catch
				{
					isErrorResponse = true;
				}
				finally
				{
					context.Response.Body = originalBody;
					memoryStream.Position = 0;
					var readToEnd = new StreamReader(memoryStream).ReadToEnd();

					ErrorResponse error = null;
					object content = null;
					if (isErrorResponse)
						error = JsonConvert.DeserializeObject<ErrorResponse>(readToEnd);
					else
					{
						try
						{
							content = JsonConvert.DeserializeObject(readToEnd);
						}
						catch
						{
							content = readToEnd;
						}
					}

					if (!context.Response.Headers.ContainsKey("Content-Type"))
						context.Response.Headers.Add("Content-Type", "application/json");

					await context.Response.WriteAsync
						(
							new ApiResponse<object>
							{
								Content = content,
								Error = error
							}.JsonStringify()
						);
				}
			}
		}
	}
}
