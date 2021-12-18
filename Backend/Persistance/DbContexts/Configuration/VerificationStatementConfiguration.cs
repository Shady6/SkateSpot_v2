using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class VerificationStatementConfiguration : BaseEntityTypeConfiguration<VerificationStatement>
	{
		public override void Configure(EntityTypeBuilder<VerificationStatement> b)
		{
			b.ToTable("VerificationStatements");

			b.Ignore(v => v.VoteChanged);

			base.Configure(b);
		}
	}
}