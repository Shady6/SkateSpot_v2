using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class VerificationProcessConfiguration : BaseEntityTypeConfiguration<VerificationProcess>
	{
		public override void Configure(EntityTypeBuilder<VerificationProcess> builder)
		{
			builder.ToTable("VerificationProcesses");

			builder.HasMany(v => v.Discussion)
				.WithOne()
				.HasForeignKey("VerificationProcessId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(v => v.Votes)
				.WithOne()
				.OnDelete(DeleteBehavior.Cascade);

			builder.Ignore(s => s.Commentable);

			base.Configure(builder);
		}
	}
}