using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class TempSpotConfiguration : BaseEntityTypeConfiguration<TempSpot>
	{
		public override void Configure(EntityTypeBuilder<TempSpot> builder)
		{
			builder.ToTable("TempSpots");

			builder.OwnsOne(s => s.Address);
			builder.OwnsOne(s => s.Obstacles);
			builder.OwnsMany(t => t.Images);

			builder.HasOne(s => s.Author)
				.WithMany(a => a.CurrentAddedTempSpots)
				.OnDelete(DeleteBehavior.SetNull);			

			builder.HasOne(s => s.VerificationProcess)
				.WithOne()
				.HasForeignKey<VerificationProcess>("TempSpotId")
				.OnDelete(DeleteBehavior.Cascade);

			base.Configure(builder);
		}
	}
}