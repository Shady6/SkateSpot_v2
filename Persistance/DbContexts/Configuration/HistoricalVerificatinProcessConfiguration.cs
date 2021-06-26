using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class HistoricalVerificatinProcessConfiguration : BaseEntityTypeConfiguration<HistoricalVerificationProcess>
	{
		public override void Configure(EntityTypeBuilder<HistoricalVerificationProcess> builder)
		{
			builder.ToTable("HistoricalVerificationProcesses");

			builder.HasMany(v => v.Discussion)
				.WithOne()
				.HasForeignKey("HistoricalVerificatinProcessId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(v => v.Votes)
				.WithOne()
				.OnDelete(DeleteBehavior.Cascade);			

			base.Configure(builder);
		}
	}
}