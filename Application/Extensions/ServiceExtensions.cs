using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.Services;
using System.Reflection;

namespace SkateSpot.Extensions.Application
{
	public static class ServiceExtensions
	{
		public static void AddApplicationLayer(this IServiceCollection services)
		{
			services.AddAutoMapper(Assembly.GetExecutingAssembly());
			services.Scan(scan =>
			scan.FromCallingAssembly()
			.AddClasses(filter => filter.InNamespaceOf<Service>())
			.AsMatchingInterface());
		}
	}
}