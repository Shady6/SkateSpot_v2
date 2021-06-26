using Microsoft.EntityFrameworkCore;
using SkateSpot.Domain.Models;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Contexts.Interfaces
{
	public interface IApplicationDbContext
	{
		DbSet<User> Users { get; set; }
		DbSet<Spot> Spots { get; set; }		
	}
}