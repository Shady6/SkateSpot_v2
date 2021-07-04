using System;
using System.Collections.Generic;
using SkateSpot.Domain.Common;

namespace SkateSpot.Domain.Models
{
	public class SpotImagesVerification : BaseEntity
	{
		public ICollection<Image> ImagesToBeVerified { get; protected set; } = new List<Image>();
		public VerificationProcess VerificationProcess { get; protected set; }
		public Spot Spot { get; protected set; }		

		public SpotImagesVerification()
		{
		}

		public SpotImagesVerification(ICollection<Image> imagesToBeVerified)
		{
			ImagesToBeVerified = imagesToBeVerified;
		}

		public void SetupVerificationProcess(Guid userId)
		{
			VerificationProcess = new VerificationProcess();
			VerificationProcess.Vote(userId, true);
		}
	}
}