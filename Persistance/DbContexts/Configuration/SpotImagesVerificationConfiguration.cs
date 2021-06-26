using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotImagesVerificationConfiguration : BaseEntityTypeConfiguration<SpotImagesVerification>
	{
		public override void Configure(EntityTypeBuilder<SpotImagesVerification> builder)
		{
			builder.ToTable("SpotImagesVerifications");

			builder.HasOne(s => s.VerificationProcess)
				.WithOne()
				.HasForeignKey<VerificationProcess>("SpotImagesVerificationId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(si => si.Spot)
				.WithMany(s => s.ImagesVerifications)
				.OnDelete(DeleteBehavior.Cascade);

			builder.OwnsMany(s => s.ImagesToBeVerified);

			base.Configure(builder);
		}
	}
}