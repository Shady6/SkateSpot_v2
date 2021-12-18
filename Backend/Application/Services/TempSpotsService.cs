using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SkateSpot.Application.Factories;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Application.Utility;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Factories;
using System;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class TempSpotsService : Service, ITempSpotsService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly ITempSpotRepository _tempSpotRepository;
		private readonly IMapper _mapper;
		private readonly IServiceScopeFactory _scopeFactory;
		private readonly IApplicationDbContext _context;

		public TempSpotsService(ISpotRepository spotRepository,
						 IMapper mapper,
						 IServiceScopeFactory scopeFactory,
						 ITempSpotRepository tempSpotRepository,
						 IApplicationDbContext context)
		{
			_spotRepository = spotRepository;
			_mapper = mapper;
			_scopeFactory = scopeFactory;
			_tempSpotRepository = tempSpotRepository;
			_context = context;
		}

		public async Task<Guid> CreateTempSpot(CreateTempSpotCommand request)
		{
			var foundSpot = await _spotRepository.FindByNameAsync(request.Name);
			if (foundSpot != null)
				throw new AppException(ErrorCode.ALREADY_EXISTS, $"Spot with name {request.Name} already exists.");

			var foundTempSpot = await _tempSpotRepository.FindByNameAsync(request.Name);
			if (foundTempSpot != null)
				throw new AppException(ErrorCode.ALREADY_EXISTS, $"Spot with name {request.Name} is already in verification process.");

			request.RemoveInvalidBase64Images();

			var tempSpot = TempSpotFactory.CreateTempSpotFromCreateCommand(request, _mapper);

			await _tempSpotRepository.AddAsync(tempSpot);
			await _tempSpotRepository.SaveChangesAsync();

			VerificationTimer.StartNewVerificationTimer(
				tempSpot.VerificationProcess.VerificationDuration.TotalMilliseconds,
				tempSpot.Id,
				VerifySpotOnTimerElapsed,
				_scopeFactory);

			return tempSpot.Id;
		}

		public async Task DeleteTempSpot(DeleteTempSpotCommand request)
		{
			var foundSpot = await ThrowOnNullAsync(() =>
				_context.TempSpots.FirstOrDefaultAsync(s => s.Id == request.Id));

			if (foundSpot.AuthorId != request.UserId)
				throw new AppException(ErrorCode.NOT_OWNED, "You can't delete temp spot which doesn't belong to you");

			_context.TempSpots.Remove(foundSpot);
			await _context.SaveChangesAsync();
		}

		private void VerifySpotOnTimerElapsed(IServiceScope scope, Guid ownerId)
		{
			var tempSpotRepository = (ITempSpotRepository)scope.ServiceProvider.GetService(typeof(ITempSpotRepository));
			var spotToVerify = tempSpotRepository.GetFullWithIds(ownerId);

			if (spotToVerify != null)
			{
				spotToVerify.VerificationProcess.SetIsVerifiedOnEndDate();
				if (spotToVerify.VerificationProcess.IsVerified)
				{
					var spot = SpotFactory.CreateFromTempSpot(spotToVerify);
					var spotRepository = (ISpotRepository)scope.ServiceProvider.GetService(typeof(ISpotRepository));
					spotRepository.Add(spot);
				}
				tempSpotRepository.Delete(spotToVerify);
				tempSpotRepository.SaveChanges();
			}
		}
	}
}