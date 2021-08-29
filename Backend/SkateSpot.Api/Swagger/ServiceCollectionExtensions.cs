using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;

namespace SkateSpot.Api.Swagger
{
	public static class ServiceCollectionExtensions
	{
		public static void RegisterSwagger(this IServiceCollection services)
		{
			services.AddSwaggerGen(c =>
			{
				c.SchemaFilter<SwaggerIgnoreFilter>();
				c.OperationFilter<SwaggerOperationIdChangerFilter>();
				c.OperationFilter<AddAuthorizationHeaderFilter>();
				c.IncludeXmlComments(string.Format(@"{0}\SkateSpot.Api.xml", System.AppDomain.CurrentDomain.BaseDirectory));
				c.SwaggerDoc("v1", new OpenApiInfo
				{
					Version = "v1",
					Title = "SkateSpot",
					License = new OpenApiLicense()
					{
						Name = "MIT License",
						Url = new Uri("https://opensource.org/licenses/MIT")
					}
				});
				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					Name = "Authorization",
					In = ParameterLocation.Header,
					Type = SecuritySchemeType.ApiKey,
					Scheme = "Bearer",
					BearerFormat = "JWT",
					Description = "Input your Bearer token in this format - Bearer {your token here} to access this API",
				});
				c.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer",
							},
							Scheme = "Bearer",
							Name = "Bearer",
							In = ParameterLocation.Header,
						}, new List<string>()
					},
			});
			});
		}
	}
}
