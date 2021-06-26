using System;

namespace SkateSpot.Domain.Common
{
	public abstract class EditableEntity : BaseEntity
	{
		public DateTime EditedAt { get; protected set; } = DateTime.MinValue;

		public void UpdateEditedAt()
		{
			EditedAt = DateTime.Now;
		}
	}
}