import { Button, Slider, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IGeoLocation } from "../../types/types";
import MapAddress from "./address/MapAddress";
import { IdFile } from "./image/FileImageUpload";
import ImageUpload from "./image/ImageUpload";
import { IdLink } from "./image/LinkImageUpload";
import Tags, { initialTags } from "./tags/Tags";
import { useInputState } from "../../hooks/useInputState";

const spotMinNameLength = 3;

const AddTempSpotPage: React.FC = () => {
  const [name, setName] = useInputState("");
  const [description, setDescription] = useInputState("");
  const [location, setLocation] = useState<IGeoLocation | null>(null);
  const [tags, setTags] = useState(initialTags);
  const [files, setFiles] = useState<IdFile[]>([]);
  const [links, setLinks] = useState<IdLink[]>([]);

  const [errors, setErrors] = useState<string[]>([]);

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
    let validationErrors: string[] = [];

    validationRules.forEach((r) => {
      if (!r.isValid()) validationErrors.push(r.errorMsg);
    });

    setErrors(validationErrors);

    if (validationErrors !== []) return;

    // Submit Spot
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
          defaultValue={5}
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
