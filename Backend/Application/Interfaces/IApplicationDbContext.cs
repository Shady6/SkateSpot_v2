using Microsoft.EntityFrameworkCore;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Interfaces
{
	public interface IApplicationDbContext
	{
		DbSet<User> Users { get; set; }
		DbSet<Spot> Spots { get; set; }
		DbSet<TempSpot> TempSpots { get; set; }
		DbSet<SpotVideo> SpotVideos { get; set; }
		DbSet<VerificationProcess> VerificationProcesses { get; set; }
		DbSet<Comment> Comments { get; set; }
	}
}