using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class TempSpotConfiguration : BaseEntityTypeConfiguration<TempSpot>
	{
		public override void Configure(EntityTypeBuilder<TempSpot> b)
		{
			b.ToTable("TempSpots");

			b.OwnsOne(s => s.Address);
			b.OwnsMany(s => s.Obstacles);
			b.OwnsMany(s => s.Images);

			b.HasOne(s => s.Author)
				.WithMany(a => a.CurrentAddedTempSpots)
				.OnDelete(DeleteBehavior.SetNull);

			b.HasOne(s => s.VerificationProcess)
				.WithOne()
				.HasForeignKey<VerificationProcess>("TempSpotId")
				.OnDelete(DeleteBehavior.Cascade);

			base.Configure(b);
		}
	}
}