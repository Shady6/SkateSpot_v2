import {
  SpotDto,
  TempSpotWithVerificationDto,
} from '../../skate_spot_api/client'

export const tempSpotToSpot = (t: TempSpotWithVerificationDto): SpotDto => ({
  address: t.address,
  author: t.author,
  comments: t.verificationProcess.discussion,
  createdAt: t.createdAt,
  description: t.description,
  id: t.id,
  images: t.images,
  likes: t.verificationProcess.votes?.map(v => ({
    positive: v.isReal,
    userId: v.voterId,
  })),
  name: t.name,
  obstacles: t.obstacles,
  surfaceScore: t.surfaceScore,
  videosCount: 0,
})
