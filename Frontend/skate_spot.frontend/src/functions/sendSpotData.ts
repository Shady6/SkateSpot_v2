import { Dispatch } from "react";
import {
  acceptedFileFormats,
  IdFile,
} from "../components/temp_spot/image/FileImageUpload";
import { IdLink } from "../components/temp_spot/image/LinkImageUpload";
import { ITag } from "../components/temp_spot/tags/Tags";
import { sendRequestWithErrorHandling } from "../hooks/useSendRequestWithErrorHandling";
import { ApiClient } from "../skate_spot_api/apiClient";
import {
  AddressDto,
  CoordsDto,
  CreateTempSpotCommand,
  ObstacleType,
} from "../skate_spot_api/client";
import { AuthState } from "../state/reducers/authReducer";
import { IGeoLocation } from "../types/types";
import { GuidApiResponse } from "../skate_spot_api/client";
import moment from "moment";

export const sendSpotData = async (
  dispatch: Dispatch<any>,
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
      linkImages: links
        .filter((l) => !l.item.url.startsWith("data:image"))
        .map((l) => l.item.url),
      base64Images: base64Images,
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

  if (files.length === 0) {
    return await sendCommand();
  }
  let filesLoaded = 0;
  let filesErrored = 0;

  let waitForAllFileLoads = new Promise<void>((resolve, reject) => {
    const interval = setInterval(() => {
      console.log("Polling check for all files loaded/errored");
      if (filesLoaded + filesErrored === files.length) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });

  files.forEach((f) => {
    let fr = new FileReader();
    fr.addEventListener("load", (e) => {
      console.log("File loaded");
      filesLoaded++;
      base64Images.push(
        `data:image/${f.item.type.slice(f.item.type.indexOf("/") + 1)};base64,${
          e!.target!.result as string
        }`
      );
    });
    fr.addEventListener("error", () => {
      console.log("File errored");
      filesErrored++;
    });

    if (acceptedFileFormats.indexOf(f.item.type) !== -1)
      fr.readAsDataURL(f.item);
  });

  const preLoad = moment.now();
  await waitForAllFileLoads;
  console.log(
    `After files loaded. Time to load: ${moment.now() - preLoad}[ms]`
  );
  return await sendCommand();
};
