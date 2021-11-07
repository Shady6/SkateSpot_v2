using Bogus;
using Bogus.Extensions;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Application.Features.TempSpotFeatures.Commands;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Application.Services.Interfaces;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkateSpot.Application.Services
{
	public class AdminService : Service, IAdminService
	{
		private readonly ISpotRepository _spotRepository;
		private readonly IUserRepository _userRepository;
		private readonly ITempSpotsService _tempSpotService;
		private readonly IImageProxyService _imageProxyService;

		public AdminService(
			ISpotRepository spotRepository,
			IUserRepository userRepository,
			IImageProxyService imageProxyService,
			ITempSpotsService tempSpotService)
		{
			_spotRepository = spotRepository;
			_userRepository = userRepository;
			_imageProxyService = imageProxyService;
			_tempSpotService = tempSpotService;
		}

		public async Task SeedFakeTempSpots(int count)
		{
			var users = makeUserFake().Generate(5);

			_userRepository.AddRange(users.ToArray());
			await _userRepository.SaveChangesAsync();

			var tempSpotFakeCommand = new Faker<CreateTempSpotCommand>()
				.RuleFor(s => s.Name, f => f.Random.Guid().ToString())
				.RuleFor(s => s.Description, f => f.Lorem.Lines(1))
				.RuleFor(s => s.Address, _ => makeAddressDtoFake().Generate())
				.RuleFor(s => s.Obstacles, f => GenerateObstacles(f))
				.RuleFor(s => s.SurfaceScore, f => (byte)f.Random.Number(0, 10))
				.RuleFor(s => s.UserId, f => f.PickRandom(users).Id)
				.RuleFor(s => s.Base64Images, f => GenerateImages(f)
				);

			foreach (var tempSpotCommand in tempSpotFakeCommand.Generate(count))
			{
				await _tempSpotService.CreateTempSpot(tempSpotCommand);
			}
		}

		public async Task SeedFakeSpots(int count)
		{
			List<User> users = makeUserFake().Generate(5);

			var likeFake = new Faker<Like>()
				.RuleFor(l => l.Giver, f => f.PickRandom(users))
				.RuleFor(l => l.Positive, f => f.Random.Bool());

			var commentFake = new Faker<Comment>()
				.RuleFor(c => c.Author, f => f.PickRandom(users))
				.RuleFor(c => c.Text, f => f.Lorem.Lines(1))
				.RuleFor(c => c.Likes, (f, c) =>
				{
					likeFake.RuleFor(l => l.SubjectType, _ => SubjectType.Comment);
					likeFake.RuleFor(l => l.CreatedAt, f => f.Date.Between(c.CreatedAt, DateTime.Now));
					return likeFake.GenerateBetween(0, 5);
				});

			var spotVideoFake = new Faker<SpotVideo>()
				.RuleFor(s => s.Author, f => f.PickRandom(users))
				.RuleFor(s => s.Comments, (f, s) =>
				{
					commentFake.RuleFor(c => c.SubjectType, _ => SubjectType.SpotVideo);
					commentFake.RuleFor(c => c.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));

					return commentFake.GenerateBetween(0, 7);
				})
				.RuleFor(s => s.Likes, (f, s) =>
				{
					likeFake.RuleFor(l => l.SubjectType, _ => SubjectType.SpotVideo);
					likeFake.RuleFor(l => l.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));
					return likeFake.GenerateBetween(0, 8);
				});

			Faker<Address> addressFake = makeAddressFake();

			var spotFake = new Faker<Spot>()
				.RuleFor(s => s.Id, f => f.Random.Guid())
				.RuleFor(s => s.CreatedAt, f => f.Date.Between(DateTime.Now.AddYears(-2), DateTime.Now))
				.RuleFor(s => s.Name, f => f.Random.Guid().ToString())
				.RuleFor(s => s.Description, f => f.Lorem.Lines(1))
				.RuleFor(s => s.Address, _ => addressFake.Generate())
				.RuleFor(s => s.Obstacles, f =>
				GenerateObstacles(f).Select(o => new ObstacleTypeObj(o)).ToArray())
				.RuleFor(s => s.SurfaceScore, f => (byte)f.Random.Number(0, 10))
				.RuleFor(s => s.Author, f => f.PickRandom(users))
				.RuleFor(s => s.Images, f => GenerateImages(f).Select(u => new SpotImage(new Image(u))).ToList())
				.RuleFor(s => s.Videos, (f, s) =>
				{
					spotVideoFake.RuleFor(sv => sv.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));

					return spotVideoFake.GenerateBetween(0, 4);
				})
				.RuleFor(s => s.Comments, (f, s) =>
				{
					commentFake.RuleFor(c => c.SubjectType, _ => SubjectType.Spot);
					commentFake.RuleFor(c => c.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));

					return commentFake.GenerateBetween(0, 10);
				})
				.RuleFor(s => s.Likes, (f, s) =>
				{
					likeFake.RuleFor(l => l.SubjectType, _ => SubjectType.Spot);
					commentFake.RuleFor(l => l.CreatedAt, f => f.Date.Between(s.CreatedAt, DateTime.Now));
					return likeFake.GenerateBetween(0, 14);
				});
			var fakeSpots = spotFake.Generate(count);

			_spotRepository.AddRange(fakeSpots.ToArray());
			await _spotRepository.SaveChangesAsync();
		}

		private static HashSet<ObstacleType> GenerateObstacles(Faker f, int tryAddTimes = 5)
		{
			var obstacles = new HashSet<ObstacleType>();
			for (int i = 0; i < tryAddTimes; i++)
			{
				var newObstacle = f.PickRandom<ObstacleType>();
				if (!obstacles.Contains(newObstacle))
					obstacles.Add(newObstacle);
			}
			return obstacles;
		}

		private List<string> GenerateImages(Faker f, int maxImages = 5)
		{
			var imagesUrls = Enumerable.Range(0, f.Random.Number(maxImages))
					.Select(_ => f.Image.PicsumUrl(
						f.Random.Number(200, 2560),
						f.Random.Number(200, 2560)))
					.ToArray();
			var b64s = _imageProxyService.GetBase64OfImagesUrls(imagesUrls).Result;
			return b64s.Where(b => b.Success).Select(b => b.Base64).ToList();
		}


		private static Faker<Address> makeAddressFake() =>
			 new Faker<Address>()
							.RuleFor(a => a.City, f => f.Address.City())
							.RuleFor(a => a.StreetName, f => f.Address.StreetName())
							.RuleFor(a => a.StreetNumber, f => f.Address.BuildingNumber())
							.RuleFor(a => a.Country, f => f.Address.Country())
							.RuleFor(a => a.PostCode, f => f.Address.ZipCode())
							.RuleFor(a => a.Latitude, f => f.Address.Latitude())
							.RuleFor(a => a.Longitude, f => f.Address.Longitude());


		private static Faker<AddressDto> makeAddressDtoFake() =>
			 new Faker<AddressDto>()
							.RuleFor(a => a.City, f => f.Address.City())
							.RuleFor(a => a.StreetName, f => f.Address.StreetName())
							.RuleFor(a => a.StreetNumber, f => f.Address.BuildingNumber())
							.RuleFor(a => a.Country, f => f.Address.Country())
							.RuleFor(a => a.PostCode, f => f.Address.ZipCode())
							.RuleFor(a => a.Coords, f => new CoordsDto
							{
								Lat = f.Address.Latitude(),
								Lng = f.Address.Longitude()
							});

		private static Faker<User> makeUserFake() =>
						new Faker<User>()
							.RuleFor(u => u.Id, f => f.Random.Guid())
							.RuleFor(u => u.CreatedAt, f => f.Date.Between(DateTime.Now.AddYears(-2), DateTime.Now))
							.RuleFor(u => u.Email, f => f.Internet.Email())
							.RuleFor(u => u.UserName, f => f.Name.FirstName() + f.Random.Number(1000000000));

	}
}