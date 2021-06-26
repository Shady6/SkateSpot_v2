using System.Linq;
using AutoMapper;
using SkateSpot.Application.DTOs;
using SkateSpot.Application.DTOs.DomainDTOs;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;

namespace SkateSpot.Application.MappingProfiles
{
	public class ApplicationProfile : Profile
	{
		public ApplicationProfile()
		{
			CreateMap<AddressDto, Address>().ReverseMap();
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
		}
	}
}