using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

namespace SkateSpot.Api.Swagger
{
	public class AddAuthorizationHeaderFilter : IOperationFilter
	{
		public void Apply(OpenApiOperation operation, OperationFilterContext context)
		{
			bool hasAuthorizeAttribute = context.MethodInfo.GetCustomAttributes(false).Any(a => a is AuthorizeAttribute) || 
				context.MethodInfo.DeclaringType.GetCustomAttributes(true).Any(a => a is AuthorizeAttribute);
			bool hasAllowAnonymousAttribute = context.MethodInfo.GetCustomAttributes(false).Any(a => a is AllowAnonymousAttribute);

			if (hasAuthorizeAttribute)
			{
				operation.Parameters.Add(new OpenApiParameter
				{
					Name = "Authorization",
					In = ParameterLocation.Header,
					Required = !hasAllowAnonymousAttribute,
					Schema = new OpenApiSchema
					{
						Type = "string"
					}
				});
			}

		}
	}
}
