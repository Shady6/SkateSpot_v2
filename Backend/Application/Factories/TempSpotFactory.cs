using System.Collections.Generic;
using AutoMapper;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.Factories
{
	public class TempSpotFactory
	{
		public static TempSpot CreateTempSpotFromCreateCommand(CreateTempSpotCommand command, IMapper mapper)
		{
			var address = mapper.Map<Address>(command.Address);
			var obstacles = mapper.Map<Obstacles>(command.Obstacles);
			var images = mapper.Map<List<Image>>(command.Images);
			var tempSpot = new TempSpot(command.Name,
					command.Description,
					command.SurfaceScore,
					command.UserId,
					address,
					obstacles,
					images);
			return tempSpot;
		}
	}
}