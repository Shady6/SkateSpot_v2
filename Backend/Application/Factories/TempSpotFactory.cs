using AutoMapper;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Domain.Models;
using System.Linq;

namespace SkateSpot.Application.Factories
{
	public class TempSpotFactory
	{
		public static TempSpot CreateTempSpotFromCreateCommand(CreateTempSpotCommand command, IMapper mapper)
		{
			var address = mapper.Map<Address>(command.Address);
			var images = command.Base64Images.Select(b64 => new Image(b64)).ToList();
			var tempSpot = new TempSpot(command.Name,
					command.Description,
					command.SurfaceScore,
					command.UserId,
					address,
					command.Obstacles,
					images);
			return tempSpot;
		}
	}
}