using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class VerificationProcessConfiguration : BaseEntityTypeConfiguration<VerificationProcess>
	{
		public override void Configure(EntityTypeBuilder<VerificationProcess> b)
		{
			b.ToTable("VerificationProcesses");

			b.HasMany(v => v.Comments)
				.WithOne()
				.HasForeignKey("VerificationProcessId")
				.OnDelete(DeleteBehavior.Cascade);

			b.HasMany(v => v.Votes)
				.WithOne()
				.OnDelete(DeleteBehavior.Cascade);

			b.Ignore(s => s.Commentable);

			base.Configure(b);
		}
	}
}