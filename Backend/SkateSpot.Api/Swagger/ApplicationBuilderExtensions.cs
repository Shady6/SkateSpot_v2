using Microsoft.AspNetCore.Builder;

namespace SkateSpot.Api.Swagger
{
	public static class ApplicationBuilderExtensions
	{
		public static void ConfigureSwagger(this IApplicationBuilder app)
		{
			app.UseSwagger();
			app.UseSwaggerUI(options =>
			{
				options.SwaggerEndpoint("/swagger/v1/swagger.json", "SkateSpot.Api");
				options.RoutePrefix = "swagger";
				options.DisplayRequestDuration();
			});
		}
	}
}
