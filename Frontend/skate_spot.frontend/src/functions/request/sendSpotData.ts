import { ITag } from '../../components/temp_spot/add/tags/Tags'
import {
  CreateTempSpotCommand,
  ObstacleType,
} from '../../skate_spot_api/client'
import { AuthState } from '../../state/reducers/authReducer'
import { IGeoLocation } from '../../types/types'
import { request } from './request'

export const sendSpotData = async (
  images: string[],
  name: string,
  description: string,
  location: IGeoLocation | null,
  surfaceScore: number,
  tags: ITag[],
  authState: AuthState
) => {
  const sendCommand = async () => {
    let command = {
      name: name,
      description: description,
      address: location?.coords
        ? {
            streetName: location?.address?.streetName,
            streetNumber: location?.address?.streetNumber,
            postCode: location?.address?.postCode,
            city: location?.address?.city,
            country: location?.address?.country,
            coords: location?.coords,
          }
        : undefined,
      surfaceScore: surfaceScore,
      obstacles: tags
        .filter(t => t.isSelected)
        .map(t => ObstacleType[t.obstacleType]),
      base64Images: images,
    }
    return await request<string>(
      (client, token) =>
        client.create_Spot(token, command as CreateTempSpotCommand),
      authState.content
    )
  }

  return await sendCommand()
}
