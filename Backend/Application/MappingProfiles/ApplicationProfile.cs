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
				.ForMember(d => d.Latitude, opt => opt.MapFrom(s => s.Coords.Latitude))
				.ForMember(d => d.Longitude, opt => opt.MapFrom(s => s.Coords.Longitude));
			CreateMap<Address, AddressDto>()
				.ForMember(d => d.Coords, opt => opt.MapFrom(s => new CoordsDto
				{
					Latitude = s.Latitude,
					Longitude = s.Longitude
				}));

			CreateMap<ObstaclesDto, Obstacles>().ReverseMap();
			CreateMap<Like, LikeDto>();
			CreateMap<Comment, CommentDto>()
				.ForMember(d => d.LikesCount, opt => opt.MapFrom(s => s.Likes.Count()));
			CreateMap<User, SmallUserDto>();
			CreateMap<Spot, SpotDto>()
				.ForMember(d => d.LikesCount, opt => opt.MapFrom(s => s.Likes.Count()));

			CreateMap<HistoricalVerificationStatement, VerificationStatementDto>();
			CreateMap<HistoricalVerificationProcess, VerificationProcessDto>();
			CreateMap<Spot, TempSpotWithVerificationDto>();

			CreateMap<VerificationStatement, VerificationStatementDto>();
			CreateMap<VerificationProcess, VerificationProcessDto>();
			CreateMap<TempSpot, TempSpotWithVerificationDto>();

			CreateMap<CommentSubjectType, SubjectType>();
			CreateMap<LikeSubjectType, SubjectType>();

			CreateMap<ISpot, SpotMarkerDataDto>()
				.ForMember(d => d.IsTempSpot, opt => opt.MapFrom(s => s is TempSpot));
		}
	}
}