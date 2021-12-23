using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class CommentConfiguration : BaseEntityTypeConfiguration<Comment>
	{
		public override void Configure(EntityTypeBuilder<Comment> b)
		{
			b.ToTable("Comments");

			b.HasMany(c => c.Likes)
				.WithOne()
				.HasForeignKey("CommentId")
				.OnDelete(DeleteBehavior.Cascade);

			b.Ignore(l => l.Likeable);

			base.Configure(b);
		}
	}
}