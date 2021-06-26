using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class UserConfiguration : BaseEntityTypeConfiguration<User>
	{
		public override void Configure(EntityTypeBuilder<User> builder)
		{
			builder.HasMany(u => u.PostedComments)
				.WithOne(c => c.Author)
				.OnDelete(DeleteBehavior.SetNull);	

			builder.HasMany(u => u.GivenLikes)
				.WithOne(l => l.Giver)
				.OnDelete(DeleteBehavior.Cascade);	

			builder.HasMany(u => u.CurrentSpotsVerifications)
				.WithOne(v => v.Voter)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(u => u.SuccessfulSpotsVerifications)
				.WithOne(v => v.Voter)
				.OnDelete(DeleteBehavior.SetNull);

			builder.HasMany(u => u.SuccessfulSpotsVerificationsComments)
				.WithOne(v => v.Author)
				.OnDelete(DeleteBehavior.SetNull);

			base.Configure(builder);
		}
	}
}