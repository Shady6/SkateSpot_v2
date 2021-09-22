import { Button, Slider, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GeoLocation } from "../../classes/GeoLocation";
import { sendSpotData } from "../../functions/sendSpotData";
import { useInputState } from "../../hooks/useInputState";
import { useRootState } from "../../state/store";
import { IGeoLocation } from "../../types/types";
import MapAddress from "./address/MapAddress";
import ImageUpload from "./image/ImageUpload";
import Tags, { ITag } from "./tags/Tags";

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
  const [fromFileImages, setFromFileImages] = useState<string[]>([]);
  const [fromLinkImages, setFromLinkImages] = useState<string[]>([]);

  // const [name, setName] = useInputState("");
  // const [description, setDescription] = useInputState("");
  // const [surfaceScore, setSurfaceScore] = useState(5);
  // const [location, setLocation] = useState<IGeoLocation | null>(null);
  // const [tags, setTags] = useState(initialTags);
  // const [files, setFiles] = useState<File[]>([]);
  // const [links, setLinks] = useState<LinkImage[]>([]);

  const [errors, setErrors] = useState<string[]>([]);
  const authState = useRootState().auth;
  const dispatch = useDispatch();

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

    sendSpotData(
      dispatch,
      fromFileImages.concat(fromLinkImages),
      name,
      description,
      location,
      surfaceScore,
      tags,
      authState
    );
  };

  const validateInputs = () => {
    let validationErrors: string[] = [];
    validationRules.forEach((r) => {
      if (!r.isValid()) validationErrors.push(r.errorMsg);
    });
    setErrors(validationErrors);
    return validationErrors;
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
          fromLinkImages={fromLinkImages}
          setFromLinkImages={setFromLinkImages}
          fromFileImages={fromFileImages}
          setFromFileImages={setFromFileImages}
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
