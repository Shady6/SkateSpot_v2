using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SkateSpot.Application.DTOs.Settings;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.Interfaces.Shared;
using SkateSpot.Infrastructure.DbContexts;
using SkateSpot.Infrastructure.Identity.Models;
using SkateSpot.Infrastructure.Identity.Services;
using SkateSpot.Infrastructure.Shared.Services;
using System;
using System.Text;
using System.Threading.Tasks;

namespace SkateSpot.Api.Extensions
{
	public static class ServiceCollectionExtensions
	{
		public static void AddSharedInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			services.Configure<MailSettings>(configuration.GetSection("MailSettings"));
			services.AddTransient<IMailService, SMTPMailService>();
		}

		public static void AddContextInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddDbContext<IdentityContext>(options =>
			options.UseNpgsql(configuration.GetConnectionString("IdentityConnection")));
			services.AddDbContext<ApplicationDbContext>(options =>
			options.UseNpgsql(configuration.GetConnectionString("PostgreConnection"),
			b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

			services.AddIdentity<ApplicationUser, IdentityRole>(options =>
			{
				options.Password.RequireNonAlphanumeric = false;
			}).AddEntityFrameworkStores<IdentityContext>().AddDefaultTokenProviders();

			services.AddTransient<IIdentityService, IdentityService>();

			services.Configure<JWTSettings>(configuration.GetSection("JWTSettings"));
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
				.AddJwtBearer(o =>
				{
					o.RequireHttpsMetadata = false;
					o.SaveToken = false;
					o.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ClockSkew = TimeSpan.Zero,
						ValidIssuer = configuration["JWTSettings:Issuer"],
						ValidAudience = configuration["JWTSettings:Audience"],
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTSettings:Key"]))
					};
					o.Events = new JwtBearerEvents()
					{
						OnAuthenticationFailed = c =>
						{
							c.NoResult();
							c.Response.StatusCode = 500;
							c.Response.ContentType = "text/plain";
							return c.Response.WriteAsync(c.Exception.ToString());
						},
						OnChallenge = context =>
						{
							if (!context.Response.HasStarted)
							{
								context.HandleResponse();
								context.Response.StatusCode = 401;
								context.Response.ContentType = "application/json";
								return context.Response.WriteAsync("You are not Authorized");
							}
							return Task.CompletedTask;
						},
						OnForbidden = context =>
						{
							if (!context.Response.HasStarted)
							{
								context.Response.StatusCode = 403;
								context.Response.ContentType = "application/json";
								return context.Response.WriteAsync("You are not authorized to access this resource");
							}
							return Task.CompletedTask;
						},
					};
				});
		}
	}
}