using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class SpotVideoConfiguration : BaseEntityTypeConfiguration<SpotVideo>
	{
		public override void Configure(EntityTypeBuilder<SpotVideo> builder)
		{
			builder.ToTable("SpotVideos");

			builder.HasOne(s => s.Spot)
				.WithMany(v => v.Videos)
				.OnDelete(DeleteBehavior.SetNull);

			builder.HasOne(s => s.Author)
				.WithMany(a => a.AddedVideos)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(s => s.Comments)
				.WithOne()
				.HasForeignKey("SpotVideoId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(s => s.Likes)
				.WithOne()
				.HasForeignKey("SpotVideoId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.Ignore(s => s.Commentable);
			builder.Ignore(l => l.Likeable);

			base.Configure(builder);
		}
	}
}