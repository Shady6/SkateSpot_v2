﻿using System.Threading.Tasks;
using SkateSpot.Application.Features.SpotVideoFeatures.Commands;

namespace SkateSpot.Application.Services.Interfaces
{
	public interface ISpotVideosService
	{
		Task AddSpotVideo(AddSpotVideoCommand request);

		Task DeleteSpotVideo(DeleteSpotVideoCommand request);
	}
}