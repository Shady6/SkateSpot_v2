using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkateSpot.Domain.Common;

namespace SkateSpot.Infrastructure.DbContexts.Configuration
{
	public abstract class BaseEntityTypeConfiguration<TBase> : IEntityTypeConfiguration<TBase>
	where TBase : BaseEntity
	{
		public virtual void Configure(EntityTypeBuilder<TBase> b)
		{
			b
				.Property(b => b.Id)
				.ValueGeneratedNever();
		}
	}
}