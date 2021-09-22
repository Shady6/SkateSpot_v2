import { Dispatch } from "react";
import { ITag } from "../components/temp_spot/tags/Tags";
import { sendRequestWithErrorHandling } from "../hooks/useSendRequestWithErrorHandling";
import { ApiClient } from "../skate_spot_api/apiClient";
import {
  AddressDto,
  CoordsDto,
  CreateTempSpotCommand,
  GuidApiResponse,
  ObstacleType,
} from "../skate_spot_api/client";
import { AuthState } from "../state/reducers/authReducer";
import { IGeoLocation } from "../types/types";

export const sendSpotData = async (
  dispatch: Dispatch<any>,
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
      address: new AddressDto({
        streetName: location?.address?.streetName,
        streetNumber: location?.address?.streetNumber,
        postCode: location?.address?.postCode,
        city: location?.address?.city,
        country: location?.address?.country,
        coords: new CoordsDto(location!.coords),
      }),
      surfaceScore: surfaceScore,
      obstacles: tags
        .filter((t) => t.isSelected)
        .map((t) => ObstacleType[t.name]),
      base64Images: images,
    });
    // TODO
    // figure out why this endpoint doesn't work when files are attached
    // it works when there are no files or with one file (maybe there is some limit ?)
    return await sendRequestWithErrorHandling<GuidApiResponse>(
      dispatch,
      () =>
        new ApiClient().create_Spot(
          "Bearer " + authState.content?.jwToken ?? "",
          command
        ),
      10000
    );
  };

  return await sendCommand();
};
