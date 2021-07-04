using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class HistoricalCommentConfiguration : BaseEntityTypeConfiguration<HistoricalComment>
	{
		public override void Configure(EntityTypeBuilder<HistoricalComment> builder)
		{
			builder.ToTable("HistoricalComments");

			builder.HasMany(c => c.Likes)
				.WithOne()
				.HasForeignKey("HistoricalCommentId")
				.OnDelete(DeleteBehavior.Cascade);		

			base.Configure(builder);
		}
	}
}