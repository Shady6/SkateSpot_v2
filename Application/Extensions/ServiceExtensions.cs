using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.Services;
using SkateSpot.Application.Services.Interfaces;

namespace SkateSpot.Extensions.Application
{
	public static class ServiceExtensions
	{
		public static void AddApplicationLayer(this IServiceCollection services)
		{
			services.AddMediatR(Assembly.GetExecutingAssembly());
			services.AddAutoMapper(Assembly.GetExecutingAssembly());
			services.Scan(scan =>
			scan.FromCallingAssembly()
			.AddClasses(filter => filter.InNamespaceOf<Service>())
			.AsMatchingInterface());
		}
	}
}