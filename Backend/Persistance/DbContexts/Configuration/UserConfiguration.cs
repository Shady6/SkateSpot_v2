using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class UserConfiguration : BaseEntityTypeConfiguration<User>
	{
		public override void Configure(EntityTypeBuilder<User> b)
		{
			b.ToTable("Users");

			b.HasMany(u => u.PostedComments)
				.WithOne(c => c.Author)
				.OnDelete(DeleteBehavior.SetNull);

			b.HasMany(u => u.GivenLikes)
				.WithOne(l => l.Giver)
				.OnDelete(DeleteBehavior.Cascade);

			b.HasMany(u => u.CurrentSpotsVerifications)
				.WithOne(v => v.Voter)
				.OnDelete(DeleteBehavior.Cascade);

			base.Configure(b);
		}
	}
}