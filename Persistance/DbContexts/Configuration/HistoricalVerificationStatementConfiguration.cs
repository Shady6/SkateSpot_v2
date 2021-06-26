using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Models;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public class HistoricalVerificationStatementConfiguration : BaseEntityTypeConfiguration<HistoricalVerificationStatement>
	{
		public override void Configure(EntityTypeBuilder<HistoricalVerificationStatement> builder)
		{			
			builder.ToTable("HistoricalVerificationStatements");

			base.Configure(builder);
		}
	}
}