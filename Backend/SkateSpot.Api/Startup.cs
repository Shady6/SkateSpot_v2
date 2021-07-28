using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SkateSpot.Api.Extensions;
using SkateSpot.Api.Middleware;
using SkateSpot.Api.Swagger;
using SkateSpot.Extensions.Application;
using SkateSpot.Infrastructure.Extensions;
using System;
using System.Text.Json.Serialization;

namespace SkateSpot.Api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public IConfiguration _configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddApplicationLayer();
			services.AddContextInfrastructure(_configuration);
			services.AddPersistenceContexts(_configuration);
			services.AddRepositories();
			services.AddSharedInfrastructure(_configuration);
			services.RegisterSwagger();
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(builder =>
				{
					builder
					.WithOrigins("http://localhost:3000")
					.AllowAnyHeader()
					.AllowAnyMethod();
				});
			});

			services.AddControllers().AddJsonOptions(o =>
			{
				o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider sp)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.ConfigureSwagger();
			app.UseHttpsRedirection();

			app.UseRouting();
			app.UseCors();
			app.UseMiddleware<ToApiResponseConverter>();
			app.UseMiddleware<ExceptionHandler>();
			app.UseAuthentication();
			app.UseMiddleware<TokenValidityChecker>();
			app.UseAuthorization();


			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}