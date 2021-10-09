using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotConfiguration : BaseEntityTypeConfiguration<Spot>
	{
		public override void Configure(EntityTypeBuilder<Spot> builder)
		{
			builder.OwnsOne(s => s.Address);
			builder.OwnsMany(s => s.Obstacles);

			builder.HasOne(s => s.Author)
				.WithMany(a => a.AddedSpots)
				.OnDelete(DeleteBehavior.SetNull);

			builder.HasMany(s => s.Comments)
				.WithOne()
				.HasForeignKey("SpotId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(s => s.Likes)
				.WithOne()
				.HasForeignKey("SpotId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(s => s.VerificationHistory)
				.WithOne()
				.HasForeignKey<HistoricalVerificationProcess>("SpotId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.Ignore(s => s.Commentable);
			builder.Ignore(l => l.Likeable);

			base.Configure(builder);
		}
	}
}