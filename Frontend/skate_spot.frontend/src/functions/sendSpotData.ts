import {
  IdFile,
  acceptedFileFormats,
} from "../components/temp_spot/image/FileImageUpload";
import { IdLink } from "../components/temp_spot/image/LinkImageUpload";
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

export const sendSpotData = (
  links: IdLink[],
  files: IdFile[],
  name: string,
  description: string,
  location: IGeoLocation | null,
  surfaceScore: number,
  tags: ITag[],
  authState: AuthState
) => {
  let base64Images: string[] = [];
  base64Images.push(
    ...links
      .filter((l) => l.item.url.startsWith("data:image"))
      .map((l) => l.item.url)
  );

  const sendCommand = () => {
    let command = new CreateTempSpotCommand({
      name: name,
      description: description,
      address: new AddressDto({
        coords: new CoordsDto(location!.coords),
        city: location?.address?.city,
        country: location?.address?.country,
        streetName: location?.address?.streetName,
        postCode: location?.address?.postCode,
      }),
      surfaceScore: surfaceScore,
      obstacles: tags
        .filter((t) => t.isSelected)
        .map((t) => ObstacleType[t.name]),
      linkImages: links
        .filter((l) => !l.item.url.startsWith("data:image"))
        .map((l) => l.item.url),
      base64Images: base64Images,
    });
    const client = new ApiClient();
    client.create_Spot("Bearer " + authState.content?.jwToken ?? "", command);
  };

  if (files.length === 0) {
    sendCommand();
    return;
  }
  let filesLoaded = 0;
  files.forEach((f) => {
    let fr = new FileReader();
    fr.addEventListener("load", (e) => {
      filesLoaded++;
      base64Images.push(
        `data:image/${f.item.type.slice(f.item.type.indexOf("/") + 1)};base64,${
          e!.target!.result as string
        }`
      );

      if (filesLoaded === files.length) sendCommand();
    });

    if (acceptedFileFormats.indexOf(f.item.type) !== -1)
      fr.readAsDataURL(f.item);
  });
};
