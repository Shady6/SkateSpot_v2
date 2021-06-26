using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.Contexts.Interfaces;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Infrastructure.DbContexts;
using SkateSpot.Infrastructure.Repositories;
using System.Reflection;

namespace SkateSpot.Infrastructure.Extensions
{
	public static class ServiceCollectionExtensions
	{
		public static void AddPersistenceContexts(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddAutoMapper(Assembly.GetExecutingAssembly());
			services.AddScoped<IApplicationDbContext, ApplicationDbContext>();			
		}

		public static void AddRepositories(this IServiceCollection services)
		{
			services.Scan(scan =>
			scan.FromCallingAssembly()
			.AddClasses(filter => filter.InNamespaceOf<SpotRepository>())
			.AsMatchingInterface());			
		}
	}
}