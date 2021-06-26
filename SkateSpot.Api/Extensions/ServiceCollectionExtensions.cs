using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SkateSpot.Application.DTOs.Settings;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.Interfaces.Shared;
using SkateSpot.Infrastructure.DbContexts;
using SkateSpot.Infrastructure.Identity.Models;
using SkateSpot.Infrastructure.Identity.Services;
using SkateSpot.Infrastructure.Shared.Services;
using System;
using System.Collections.Generic;
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

		public static void AddEssentials(this IServiceCollection services)
		{
			services.RegisterSwagger();
		}

		private static void RegisterSwagger(this IServiceCollection services)
		{
			services.AddSwaggerGen(c =>
			{
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

			#region Services

			services.AddTransient<IIdentityService, IdentityService>();

			#endregion Services

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