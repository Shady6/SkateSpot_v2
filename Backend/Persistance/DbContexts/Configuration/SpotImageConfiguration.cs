using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotImageConfiguration : BaseEntityTypeConfiguration<SpotImage>
	{
		public override void Configure(EntityTypeBuilder<SpotImage> b)
		{
			b.ToTable("SpotImages");

			b.OwnsOne(si => si.Image);

			b.HasOne(si => si.Spot)
				.WithMany(s => s.Images)
				.OnDelete(DeleteBehavior.Cascade);

			base.Configure(b);
		}
	}
}