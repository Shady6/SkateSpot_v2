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
using SkateSpot.Domain.Common;
using SkateSpot.Infrastructure.DbContexts;
using SkateSpot.Infrastructure.Identity.Models;
using SkateSpot.Infrastructure.Identity.Services;
using SkateSpot.Infrastructure.Shared.Services;
using System;
using System.Text;

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
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

			AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
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
			services.AddTransient<ITokenManager, TokenManager>();
			services.AddDistributedRedisCache(r =>
			{
				r.Configuration = configuration["redis:connectionString"];
			});

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
							throw new AppException(ErrorCode.UNAUTHORIZED, "You're unauthorized, please login again.");
						},
						OnChallenge = context =>
						{
							throw new AppException(ErrorCode.UNAUTHORIZED, "You're unauthorized, please login again.");
						},
						OnForbidden = context =>
						{
							throw new AppException(ErrorCode.FORBIDDEN, "You don't have access rights to this resource.");
						},
					};
				});
		}
	}
}