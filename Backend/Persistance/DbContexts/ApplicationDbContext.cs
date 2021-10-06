using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkateSpot.Domain.Models;
using System.Reflection;

namespace SkateSpot.Infrastructure.DbContexts
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
			base.OnModelCreating(modelBuilder);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseLoggerFactory(_myLoggerFactory);
			optionsBuilder.EnableDetailedErrors();
			optionsBuilder.EnableSensitiveDataLogging();
			base.OnConfiguring(optionsBuilder);
		}

		public static readonly LoggerFactory _myLoggerFactory =
		new LoggerFactory(new[] {
			new Microsoft.Extensions.Logging.Debug.DebugLoggerProvider()
		});

		public DbSet<User> Users { get; set; }
		public DbSet<Spot> Spots { get; set; }
		public DbSet<TempSpot> TempSpots { get; set; }
		public DbSet<SpotVideo> SpotVideos { get; set; }
		public DbSet<VerificationProcess> VerificationProcesses { get; set; }
		public DbSet<Comment> Comments { get; set; }
	}
}