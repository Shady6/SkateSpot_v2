using System;

namespace SkateSpot.Application.DTOs.DomainDTOs
{
	public class CommentDto
	{
		public Guid Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime EditedAt { get; set; }
		public Guid? AuthorId { get; set; }
		public SmallUserDto Author { get; set; }		
		public string Text { get; set; }
		public bool IsDeleted { get; set; }
		public int LikesCount { get; set; }		
	}
}