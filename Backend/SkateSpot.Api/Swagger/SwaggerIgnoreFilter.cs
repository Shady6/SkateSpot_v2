using Microsoft.OpenApi.Models;
using SkateSpot.Application.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;
using System.Reflection;

namespace SkateSpot.Api.Swagger
{
	public class SwaggerIgnoreFilter : ISchemaFilter
	{
		public void Apply(OpenApiSchema schema, SchemaFilterContext schemaFilterContext)
		{
			var excludedProps = schemaFilterContext.Type.GetProperties(BindingFlags.Public)
				.Where(p => p.GetCustomAttribute<SwaggerIgnoreAttribute>() != null);

			foreach (var excludedProp in excludedProps)
			{
				if (schema.Properties.ContainsKey(excludedProp.Name))
					schema.Properties.Remove(excludedProp.Name);
			}
		}
	}
}
