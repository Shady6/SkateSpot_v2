using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class VerificationStatementConfiguration : BaseEntityTypeConfiguration<VerificationStatement>
	{
		public override void Configure(EntityTypeBuilder<VerificationStatement> builder)
		{
			builder.Ignore(v => v.VoteChanged);
			builder.ToTable("VerificationStatements");

			base.Configure(builder);
		}
	}
}