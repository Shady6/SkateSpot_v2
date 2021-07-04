using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkateSpot.Domain.Common
{
	public abstract class BaseEntity
	{
		// Configuration with fluent api doesn't work ...
		// https://stackoverflow.com/questions/57923422/ef-core-3-0-adding-connected-entity-to-collection-fails-in-one-to-many-relations
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public Guid Id { get; protected set; } = Guid.NewGuid();
		public DateTime CreatedAt { get; protected set; } = DateTime.Now;
	}
}