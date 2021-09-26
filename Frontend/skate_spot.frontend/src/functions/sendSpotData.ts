import { ITag } from "../components/temp_spot/tags/Tags";
import { ApiClient } from "../skate_spot_api/apiClient";
import {
  AddressDto,
  CoordsDto,
  CreateTempSpotCommand,
  ObstacleType,
} from "../skate_spot_api/client";
import { AuthState } from "../state/reducers/authReducer";
import { IGeoLocation } from "../types/types";
import { sendRequestAndGetResponse } from "./sendRequestAndGetResponse";

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
    let command = new CreateTempSpotCommand({
      name: name,
      description: description,
      address: location?.coords
        ? new AddressDto({
            streetName: location?.address?.streetName,
            streetNumber: location?.address?.streetNumber,
            postCode: location?.address?.postCode,
            city: location?.address?.city,
            country: location?.address?.country,
            coords: new CoordsDto(location?.coords),
          })
        : undefined,
      surfaceScore: surfaceScore,
      obstacles: tags
        .filter((t) => t.isSelected)
        .map((t) => ObstacleType[t.name]),
      base64Images: images,
    });
    return await sendRequestAndGetResponse<string>(
      (token) => new ApiClient().create_Spot(token, command),
      authState.content
    );
  };

  return await sendCommand();
};
