﻿using AutoMapper;
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

			CreateMap<Like, LikeDto>();
			CreateMap<Comment, CommentDto>()
				.ForMember(d => d.LikesCount, opt => opt.MapFrom(s => s.Likes.Count()));
			CreateMap<User, SmallUserDto>();
			CreateMap<Spot, SpotDto>()
				.ForMember(d => d.LikesCount, opt => opt.MapFrom(s => s.Likes.Count()));

			CreateMap<HistoricalVerificationStatement, VerificationStatementDto>();
			CreateMap<HistoricalVerificationProcess, VerificationProcessDto>();

			CreateMap<VerificationStatement, VerificationStatementDto>();
			CreateMap<VerificationProcess, VerificationProcessDto>();
			CreateMap<TempSpot, TempSpotWithVerificationDto>()
				.ForMember(d => d.Obstacles, opt =>
				opt.MapFrom(s => s.Obstacles.Select(o => o.ObstacleType).ToHashSet()));

			CreateMap<CommentSubjectType, SubjectType>();
			CreateMap<LikeSubjectType, SubjectType>();

			CreateMap<ISpot, SpotMarkerDataDto>()
				.ForMember(d => d.IsTempSpot, opt => opt.MapFrom(s => s is TempSpot));

			CreateMap<Image, ImageDto>();
		}
	}
}