using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Text;

namespace SkateSpot.Api.Swagger
{
	public class SwaggerOperationIdChanger : IOperationFilter
	{
		public void Apply(OpenApiOperation operation, OperationFilterContext context)
		{
			var methodName = context.MethodInfo.Name;
			var requestId = "";

			StringBuilder builder = new StringBuilder();
			foreach (char c in methodName)
			{
				if (Char.IsUpper(c) && builder.Length > 0) builder.Append(' ');
				builder.Append(c);
			}
			requestId = builder.ToString();

			operation.OperationId = requestId;
		}
	}
}
