using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotVideoConfiguration : BaseEntityTypeConfiguration<SpotVideo>
	{
		public override void Configure(EntityTypeBuilder<SpotVideo> b)
		{
			b.ToTable("SpotVideos");

			b.HasOne(s => s.Spot)
				.WithMany(v => v.Videos)
				.OnDelete(DeleteBehavior.SetNull);

			b.HasOne(s => s.Author)
				.WithMany(a => a.AddedVideos)
				.OnDelete(DeleteBehavior.Cascade);

			b.HasMany(s => s.Comments)
				.WithOne()
				.HasForeignKey("SpotVideoId")
				.OnDelete(DeleteBehavior.Cascade);

			b.HasMany(s => s.Likes)
				.WithOne()
				.HasForeignKey("SpotVideoId")
				.OnDelete(DeleteBehavior.Cascade);

			b.Ignore(s => s.Commentable);
			b.Ignore(l => l.Likeable);

			base.Configure(b);
		}
	}
}