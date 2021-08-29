using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using RestSharp;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Features.TempSpotFeatures.Queries;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Application.Utility;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Factories;
using SkateSpot.Domain.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class TempSpotsService : Service, ITempSpotsService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly ITempSpotRepository _tempSpotRepository;
		private readonly IMapper _mapper;
		private readonly IServiceScopeFactory _scopeFactory;

		public TempSpotsService(ISpotRepository spotRepository,
						 IMapper mapper,
						 IServiceScopeFactory scopeFactory,
						 ITempSpotRepository tempSpotRepository)
		{
			_spotRepository = spotRepository;
			_mapper = mapper;
			_scopeFactory = scopeFactory;
			_tempSpotRepository = tempSpotRepository;
		}

		public async Task<Guid> CreateTempSpot(CreateTempSpotCommand request)
		{
			var foundSpot = await _spotRepository.FindByNameAsync(request.Name);
			if (foundSpot != null)
				throw new AppException(ErrorCode.ALREADY_EXISTS, $"Spot with name {request.Name} already exists.");

			var foundTempSpot = await _tempSpotRepository.FindByNameAsync(request.Name);
			if (foundTempSpot != null)
				throw new AppException(ErrorCode.ALREADY_EXISTS, $"Spot with name {request.Name} is already in verification process.");


			// validate link images, change images which are not .png or .jpg to base64
			var base64Images = request.LinkImages.Where(l => l.StartsWith("data:image")).ToList();
			var validImageLinks = request.LinkImages.Except(base64Images).Where(l =>
			l.EndsWith(".png") ||
			l.EndsWith(".jpg") ||
			l.EndsWith(".jpeg") ||
			l.EndsWith(".gif") ||
			l.EndsWith(".apng") ||
			l.EndsWith(".tiff"));
			var invalidImageLinks = request.LinkImages.Except(validImageLinks).Except(base64Images);
			var client = new RestClient();
			foreach (var invalidImageLink in invalidImageLinks)
			{
				var imgReq = new RestRequest(new Uri(invalidImageLink), Method.GET);
				var res = await client.ExecuteAsync(imgReq);
				var base64 = Convert.ToBase64String(res.RawBytes);
				base64Images.Add(base64);
			}




			return Guid.Empty;
			//var tempSpot = TempSpotFactory.CreateTempSpotFromCreateCommand(request, _mapper);
			var tempSpot = new TempSpot();

			await _tempSpotRepository.AddAsync(tempSpot);
			await _tempSpotRepository.SaveChangesAsync();

			VerificationTimer.StartNewVerificationTimer(tempSpot.VerificationProcess.VerificationDuration.TotalMilliseconds, tempSpot.Id, VerifySpotOnTimerElapsed, _scopeFactory);

			return tempSpot.Id;
		}

		public async Task<TempSpotWithVerificationDto> GetTempSpotWithVerification(GetTempSpotWithVerificationQuery request)
		{
			var foundSpot = await ThrowOnNullAsync(() => _tempSpotRepository.GetFullWithEntitiesAsync(request.SpotId));
			return _mapper.Map<TempSpotWithVerificationDto>(foundSpot);
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