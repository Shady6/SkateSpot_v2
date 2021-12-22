using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SkateSpot.Application.DTOs.Settings;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.MappingProfiles;
using SkateSpot.Application.Services;
using SkateSpot.Domain.Common;
using SkateSpot.Infrastructure.DbContexts;
using SkateSpot.Infrastructure.Identity.Models;
using SkateSpot.Infrastructure.Identity.Services;
using SkateSpot.Infrastructure.Repositories;
using System;
using System.Reflection;
using System.Text;

namespace SkateSpot.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
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
                            throw new AppException(ErrorCode.UNAUTHORIZED, "You're unauthorized, please login first.");
                        },
                        OnChallenge = context =>
                        {
                            throw new AppException(ErrorCode.UNAUTHORIZED, "You're unauthorized, please login first.");
                        },
                        OnForbidden = context =>
                        {
                            throw new AppException(ErrorCode.FORBIDDEN, "You don't have access rights to this resource.");
                        },
                    };
                });
        }

        public static void AddApplicationLayer(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetAssembly(typeof(ApplicationProfile)));
            services.AddTransient<IApplicationDbContext, ApplicationDbContext>();            
            services.Scan(scan =>
            scan.FromAssemblyOf<Service>()
            .AddClasses(filter => filter.InNamespaceOf<Service>())
            .AsMatchingInterface());
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.Scan(scan =>
            scan.FromAssemblyOf<SpotRepository>()
            .AddClasses(filter => filter.InNamespaceOf<SpotRepository>())
            .AsImplementedInterfaces()
            );
        }
    }
}