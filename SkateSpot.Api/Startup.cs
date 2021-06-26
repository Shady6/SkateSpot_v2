using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SkateSpot.Api.Extensions;
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
			services.AddEssentials();

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
				//app.UseExceptionHandler("/error");
				app.UseDeveloperExceptionPage();
			}

			app.ConfigureSwagger();
			app.UseHttpsRedirection();

			app.UseRouting();
			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}