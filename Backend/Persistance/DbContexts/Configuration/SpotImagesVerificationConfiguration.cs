using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotImagesVerificationConfiguration : BaseEntityTypeConfiguration<SpotImagesVerification>
	{
		public override void Configure(EntityTypeBuilder<SpotImagesVerification> b)
		{
			b.ToTable("SpotImagesVerifications");

			b.HasOne(s => s.VerificationProcess)
				.WithOne()
				.HasForeignKey<VerificationProcess>("SpotImagesVerificationId")
				.OnDelete(DeleteBehavior.Cascade);

			b.HasOne(si => si.Spot)
				.WithMany(s => s.ImagesVerifications)
				.OnDelete(DeleteBehavior.Cascade);

			b.OwnsMany(s => s.ImagesToBeVerified);

			base.Configure(b);
		}
	}
}