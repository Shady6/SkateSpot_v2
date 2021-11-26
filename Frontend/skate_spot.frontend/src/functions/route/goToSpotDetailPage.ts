import { RouteParams, Routes } from '../../routes/appRoutes'
import { SpotDto } from '../../skate_spot_api/client'

export const goToSpotDetailPage = (args: { history: any; spot: SpotDto }) => {
  args.history.push(
    Routes.SPOT_DEDICATED_PAGE.replace(
      RouteParams.SPOT_NAME,
      args.spot.name as string
    ),
    {
      spot: args.spot,
    }
  )
}
