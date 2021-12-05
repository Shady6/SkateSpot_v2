using SkateSpot.Application.DTOs.DomainDTOs;

namespace SkateSpot.Application.DTOs.UserRelatedFilter
{
	public class UserRelatedEntities
	{
		public SpotDto[] Spots { get; set; }
		public SpotVideoDto[] SpotVideos { get; set; }
		public int TotalCount { get; set; }
	}
}