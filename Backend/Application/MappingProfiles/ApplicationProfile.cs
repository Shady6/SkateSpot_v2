using AutoMapper;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using System.Linq;

namespace SkateSpot.Application.MappingProfiles
{
	public class ApplicationProfile : Profile
	{
		public ApplicationProfile()
		{
			CreateMap<AddressDto, Address>()
				.ForMember(d => d.Latitude, opt => opt.MapFrom(s => s.Coords.Lat))
				.ForMember(d => d.Longitude, opt => opt.MapFrom(s => s.Coords.Lng));
			CreateMap<Address, AddressDto>()
				.ForMember(d => d.Coords, opt => opt.MapFrom(s => new CoordsDto
				{
					Lat = s.Latitude,
					Lng = s.Longitude
				}));

			CreateMap<Like, LikeDto>()
				.ForMember(d => d.UserId, opt => opt.MapFrom(s => s.GiverId));
			CreateMap<Comment, CommentDto>();
			CreateMap<User, SmallUserDto>();
			CreateMap<Spot, SpotDto>()
				.ForMember(d => d.Obstacles, opt =>
				opt.MapFrom(s => s.Obstacles.Select(o => o.ObstacleType)))
				.ForMember(d => d.VideosCount, opt => opt.MapFrom(s => s.Videos.Count()))
				.ForMember(d => d.Comments, opt => opt.MapFrom(s =>
					s.Comments.OrderByDescending(c => c.CreatedAt)));

			CreateMap<VerificationStatement, VerificationStatementDto>();
			CreateMap<VerificationProcess, VerificationProcessDto>()
				.ForMember(d => d.Discussion, opt => opt.MapFrom(s =>
					s.Comments.OrderByDescending(c => c.CreatedAt)));
			CreateMap<TempSpot, TempSpotDto>()
				.ForMember(d => d.Obstacles, opt =>
				opt.MapFrom(s => s.Obstacles.Select(o => o.ObstacleType)));

			CreateMap<CommentSubjectType, SubjectType>();
			CreateMap<LikeSubjectType, SubjectType>();

			CreateMap<ISpot, SpotMarkerDataDto>()
				.ForMember(d => d.IsTempSpot, opt => opt.MapFrom(s => s is TempSpot))
				.ForMember(d => d.Obstacles, opt =>
				opt.MapFrom(s => s.Obstacles.Select(o => o.ObstacleType)));

			CreateMap<SpotImage, ImageDto>()
				.ForMember(d => d.Base64, opt => opt.MapFrom(s => s.Image.Base64));
			CreateMap<Image, ImageDto>();

			CreateMap<SpotVideo, SpotVideoDto>()
				.ForMember(d => d.Comments, opt => opt.MapFrom(s =>
					s.Comments.OrderByDescending(c => c.CreatedAt)));

			CreateMap<Spot, SmallSpotDto>()
				.ForMember(d => d.Obstacles, opt =>
				opt.MapFrom(s => s.Obstacles.Select(o => o.ObstacleType)));
		}
	}
}