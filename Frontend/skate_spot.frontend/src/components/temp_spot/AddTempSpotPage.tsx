import { Button, Slider, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useInputState } from "../../hooks/useInputState";
import { ApiClient } from "../../skate_spot_api/apiClient";
import {
  AddressDto,
  CoordsDto,
  CreateTempSpotCommand,
  ObstacleType,
} from "../../skate_spot_api/client";
import { useRootState } from "../../state/store";
import { IGeoLocation } from "../../types/types";
import MapAddress from "./address/MapAddress";
import { IdFile } from "./image/FileImageUpload";
import ImageUpload from "./image/ImageUpload";
import { IdLink } from "./image/LinkImageUpload";
import Tags, { initialTags, ITag } from "./tags/Tags";
import { v4 } from "uuid";
import Tag from "./tags/Tag";
import { GeoLocation } from "../../classes/GeoLocation";

const spotMinNameLength = 3;

const AddTempSpotPage: React.FC = () => {
  // DEBUG
  const [name, setName] = useInputState("Plac trzech krzyży");
  const [description, setDescription] = useInputState(
    "Tzw. Witos, fajny klimat. Polecam serdecznie."
  );
  const [surfaceScore, setSurfaceScore] = useState(7);
  const [location, setLocation] = useState<IGeoLocation | null>(
    new GeoLocation(
      {
        lat: 52.2276649,
        lng: 21.0235786,
      },
      {
        city: "Warsaw",
        country: "Poland",
        postCode: "00-535",
        streetName: "Plac Trzech Krzyży",
        streetNumber: "1",
        display:
          "Witos, Plac Trzech Krzyży, Śródmieście Południowe, Śródmieście, Warsaw, Masovian Voivodeship, 00-535, Poland",
      }
    )
  );
  const [tags, setTags] = useState<ITag[]>([
    { name: "Skatepark", isSelected: false },
    { name: "Ledge", isSelected: true },
    { name: "Rail", isSelected: false },
    { name: "Stairs", isSelected: true },
    { name: "Bank", isSelected: false },
    { name: "Kicker", isSelected: false },
    { name: "Manualpad", isSelected: false },
    { name: "Flatground", isSelected: true },
    { name: "Quater", isSelected: false },
    { name: "Downhill", isSelected: false },
  ]);
  const [files, setFiles] = useState<IdFile[]>([]);
  const [links, setLinks] = useState<IdLink[]>([
    {
      uuid: v4(),
      item: {
        name: "img1",
        url: "data:image/jpeg;base64,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",
      },
    },
    {
      uuid: v4(),
      item: {
        name: "img2",
        url: "https://bi.im-g.pl/im/dd/c5/17/z24928221V,Ewolucje-skaterskie-pod-pomnikiem-Wincentego-Witos.jpg",
      },
    },
    {
      uuid: v4(),
      item: {
        name: "img3",
        url: "https://play-lh.googleusercontent.com/MFcmDsDGgSXwft_c4ryKi6RV11MNjF2CRSsWHEqwYnjKPOQa5CPfysSPTVWQBat1EKxD",
      },
    },
  ]);

  // const [name, setName] = useInputState("");
  // const [description, setDescription] = useInputState("");
  // const [surfaceScore, setSurfaceScore] = useState(5);
  // const [location, setLocation] = useState<IGeoLocation | null>(null);
  // const [tags, setTags] = useState(initialTags);
  // const [files, setFiles] = useState<IdFile[]>([]);
  // const [links, setLinks] = useState<IdLink[]>([]);

  const [errors, setErrors] = useState<string[]>([]);
  const authState = useRootState().auth;

  const validationRules = [
    {
      refersTo: name,
      isValid: () => name && name.length >= spotMinNameLength,
      errorMsg: `Name needs to be at least ${spotMinNameLength} letters long`,
    },
    {
      refersTo: location,
      isValid: () => !!location,
      errorMsg: `You need to select location`,
    },
    {
      refersTo: tags,
      isValid: () =>
        tags.map((t) => Number(t.isSelected)).reduce((p, c) => p + c) > 0,
      errorMsg: `You need to select at least one tag`,
    },
  ];

  useEffect(
    () => {
      if (errors === []) return;

      let errorsToRemove: string[] = [];
      validationRules.forEach((r) => {
        if (r.isValid()) errorsToRemove.push(r.errorMsg);
      });
      setErrors(errors.filter((e) => errorsToRemove.indexOf(e) === -1));
    },
    validationRules.map((r) => r.refersTo)
  );

  const submitSpot = () => {
    let validationErrors: string[] = validateInputs();
    if (validationErrors.length !== 0) return;

    sendSpotData();
  };

  const validateInputs = () => {
    let validationErrors: string[] = [];
    validationRules.forEach((r) => {
      if (!r.isValid()) validationErrors.push(r.errorMsg);
    });
    setErrors(validationErrors);
    return validationErrors;
  };

  const sendSpotData = () => {
    let base64Images: string[] = [];
    files.forEach((f) => {
      let fr = new FileReader();
      fr.addEventListener("load", (e) => {
        base64Images.push(e!.target!.result as string);
      });

      fr.readAsDataURL(f.item);
    });

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
      linkImages: links.map((l) => l.item.url),
      fileImages: base64Images,
    });
    const client = new ApiClient();
    client.create_Spot("Bearer " + authState.content?.jwToken ?? "", command);
  };

  return (
    <div>
      <div className="mb-4 col-2">
        <TextField
          value={name}
          onChange={setName}
          required={true}
          fullWidth={true}
          variant="standard"
          label="Name"
        />
      </div>
      <div className="mb-4 col-2">
        <TextField
          value={description}
          onChange={setDescription}
          rows={3}
          multiline={true}
          fullWidth={true}
          variant="standard"
          label="Description"
        />
      </div>
      <div className="mb-4 col-2">
        <p>Surface score</p>
        <Slider
          defaultValue={surfaceScore}
          // @ts-ignore
          onChange={(e) => setSurfaceScore(Number(e.target.value))}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={10}
          marks={[
            { value: 1, label: "The worst" },
            { value: 10, label: "The best" },
          ]}
        />
      </div>
      <div className="mb-5">
        <MapAddress location={location} setLocation={setLocation} />
      </div>

      <div className="mb-5">
        <Tags tags={tags} setTags={setTags} />
      </div>
      <div className="mb-5">
        <ImageUpload
          files={files}
          setFiles={setFiles}
          links={links}
          setLinks={setLinks}
        />
      </div>
      {errors.map((e) => (
        <p key={e} className="text-sm text-danger">
          {e}
        </p>
      ))}
      <Button onClick={submitSpot} size="large" variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default AddTempSpotPage;
