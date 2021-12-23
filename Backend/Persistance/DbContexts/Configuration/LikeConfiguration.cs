using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class LikeConfiguration : BaseEntityTypeConfiguration<Like>
	{
		public override void Configure(EntityTypeBuilder<Like> b)
		{
			b.ToTable("Likes");			

			base.Configure(b);
		}
	}
}