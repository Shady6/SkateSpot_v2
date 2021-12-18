using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotConfiguration : BaseEntityTypeConfiguration<Spot>
	{
		public override void Configure(EntityTypeBuilder<Spot> b)
		{
			b.ToTable("Spots");

			b.OwnsOne(s => s.Address);
			b.OwnsMany(s => s.Obstacles);

			b.HasOne(s => s.Author)
				.WithMany(a => a.AddedSpots)
				.OnDelete(DeleteBehavior.SetNull);

			b.HasMany(s => s.Comments)
				.WithOne()
				.HasForeignKey("SpotId")
				.OnDelete(DeleteBehavior.Cascade);

			b.HasMany(s => s.Likes)
				.WithOne()
				.HasForeignKey("SpotId")
				.OnDelete(DeleteBehavior.Cascade);

			b.Ignore(s => s.Commentable);
			b.Ignore(l => l.Likeable);

			base.Configure(b);
		}
	}
}