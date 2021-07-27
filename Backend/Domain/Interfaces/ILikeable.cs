﻿using System;
using System.Collections.Generic;
using SkateSpot.Domain.Models;

namespace SkateSpot.Domain.Interfaces
{
	public interface ILikeable
	{ 
		void AddLike(Like like);

		void DeleteLike(Guid userId);
	}
}