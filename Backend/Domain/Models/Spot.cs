using SkateSpot.Domain.Common;
using SkateSpot.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkateSpot.Domain.Models
{
	public class Spot : EditableEntity, ICommentable, ILikeable, ISpot
	{
		public string Name { get; protected set; }
		public string Description { get; protected set; }
		public Address Address { get; protected set; }
		public byte SurfaceScore { get; protected set; }
		public Obstacles Obstacles { get; protected set; }
		public Guid? AuthorId { get; protected set; }
		public User Author { get; protected set; }
		public HistoricalVerificationProcess VerificationHistory { get; protected set; }
		public ICollection<SpotVideo> Videos { get; protected set; } = new List<SpotVideo>();
		public ICollection<SpotImage> Images { get; protected set; } = new List<SpotImage>();
		public ICollection<SpotImagesVerification> ImagesVerifications { get; protected set; } = new List<SpotImagesVerification>();

		public ICollection<Like> Likes
		{
			get => Likeable.Likes;
			protected set => Likeable.SetLikes(value);
		}

		public LikeableEntity Likeable { get; protected set; } = new LikeableEntity();

		public ICollection<Comment> Comments
		{
			get => Commentable.Comments;
			protected set => Commentable.SetComments(value);
		}

		public CommentableEntity Commentable { get; protected set; } = new CommentableEntity();

		private readonly int maxImages = 10;

		public Spot()
		{
		}

		public Spot(DateTime createdAt,
			  string name,
			  string description,
			  byte surfaceScore,
			  Guid? authorId,
			  Address address,
			  Obstacles obstacles,
			  HistoricalVerificationProcess verificationHistory,
			  ICollection<SpotImage> images

			  )
		{
			CreatedAt = createdAt;
			Name = name;
			Description = description;
			SurfaceScore = surfaceScore;
			AuthorId = authorId;
			Address = address;
			Obstacles = obstacles;
			VerificationHistory = verificationHistory;
			Images = images;
		}

		public void AddImages(ICollection<Image> images, Guid userId)
		{
			var imagesInVerification = ImagesVerifications.Sum(iv => iv.ImagesToBeVerified.Count());
			var verifiedImages = Images.Count();
			var freeImageSlots = maxImages - verifiedImages + imagesInVerification;
			if (freeImageSlots == 0 && imagesInVerification != 0)
				throw new AppException(ErrorCode.IMAGES_MAXED,
					"The spot already has maximum number of images including images which are currently being verified.");
			else if (freeImageSlots == 0)
				throw new AppException(ErrorCode.IMAGES_MAXED,
					"The spot already has maximum number of images.");
			else if (images.Count() > freeImageSlots)
				throw new AppException(ErrorCode.TOO_MANY_IMAGES,
					$"There spot has {verifiedImages} images and {imagesInVerification} " +
					$"are currently in verification. Spot can only have {maxImages} images so you can add maximum of {freeImageSlots}.");

			var spotImageVerification = new SpotImagesVerification(images);
			spotImageVerification.SetupVerificationProcess(userId);
		}

		public void HandleImagesVerificationEnd()
		{
			var imagesVerification = ImagesVerifications.FirstOrDefault(iv =>
				iv.VerificationProcess.HasVerificationPeriodEnded);

			if (imagesVerification != null)
			{
				imagesVerification.VerificationProcess.SetIsVerifiedOnEndDate();
				TransferVerifiedImages(imagesVerification);
			}
		}

		public void TransferVerifiedImages(SpotImagesVerification imagesVerification)
		{
			if (imagesVerification.VerificationProcess.IsVerified)
			{
				foreach (var image in imagesVerification.ImagesToBeVerified)
				{
					Images.Add(new SpotImage(image));
				}
			}
			ImagesVerifications.Remove(imagesVerification);
		}

		public void AddSpotVideo(SpotVideo video) =>
			Videos.Add(video);

		public void DeleteSpotVideo(Guid spotVideoId, Guid userId)
		{
			var foundVideo = Videos.FirstOrDefault(v => v.Id == spotVideoId);
			if (foundVideo == null)
				throw new AppException(ErrorCode.DOESNT_EXIST, "The video you're trying to delete doesn't exist.");
			else if (foundVideo.AuthorId != userId)
				throw new AppException(ErrorCode.NOT_OWNED, "You don't own this video.");
			Videos.Remove(foundVideo);
		}

		public void AddLike(Like like) =>
			Likeable.AddLike(like);

		public void DeleteLike(Guid userId) =>
			Likeable.DeleteLike(userId);

		public void AddComment(Comment comment) =>
			Commentable.AddComment(comment);

		public void DeleteComment(Guid commentId, Guid userId) =>
			Commentable.DeleteComment(commentId, userId);

		public void EditComment(Guid commentId, Guid userId, string newText) =>
			Commentable.EditComment(commentId, userId, newText);
	}
}