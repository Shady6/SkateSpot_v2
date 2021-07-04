using System;

namespace SkateSpot.Application.Swagger
{
	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
	public class SwaggerIgnoreAttribute : Attribute
	{
	}
}
