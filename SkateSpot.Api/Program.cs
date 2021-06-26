using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SkateSpot.Application.Enums;
using SkateSpot.Infrastructure.Identity.Models;


namespace SkateSpot.Api
{
	public class Program
	{
		public async static Task Main(string[] args)
		{
			var host = CreateHostBuilder(args).Build();
			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;
				var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
				var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
				await roleManager.CreateAsync(new IdentityRole(Roles.SuperAdmin.ToString()));
				await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));
				await roleManager.CreateAsync(new IdentityRole(Roles.Moderator.ToString()));
				await roleManager.CreateAsync(new IdentityRole(Roles.Basic.ToString()));
			}

			host.Run();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
			.ConfigureLogging(logging =>
			{
				logging.ClearProviders();
				logging.AddConsole();
			})
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
				});
	}
}