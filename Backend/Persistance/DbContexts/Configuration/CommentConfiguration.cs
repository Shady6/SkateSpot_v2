using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class CommentConfiguration : BaseEntityTypeConfiguration<Comment>
	{
		public override void Configure(EntityTypeBuilder<Comment> builder)
		{
			builder.ToTable("Comments");

			builder.HasMany(c => c.Likes)
				.WithOne()
				.HasForeignKey("CommentId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.Ignore(l => l.SubjectId);
			builder.Ignore(l => l.Subject);
			builder.Ignore(l => l.Likeable);

			base.Configure(builder);
		}
	}
}