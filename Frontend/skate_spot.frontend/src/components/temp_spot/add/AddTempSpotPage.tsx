import { Button, CircularProgress, Slider, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { sendSpotData } from "../../../functions/request/sendSpotData";
import { useInputState } from "../../../hooks/util/useInputState";
import { createFlashMsgWithTimeout } from "../../../state/reducers/flashMsgReducer";
import { useRootState } from "../../../state/store";
import { IGeoLocation } from "../../../types/types";
import MapAddress from "./address/MapAddress";
import ImageUpload from "./image/ImageUpload";
import Tags, { ITag } from "./tags/Tags";
const AddTempSpotPage: React.FC = () => {
  const [name, setName] = useInputState("");
  const [description, setDescription] = useInputState("");
  const [surfaceScore, setSurfaceScore] = useState(5);
  const [location, setLocation] = useState<IGeoLocation | null>(null);
  const [fromFileImages, setFromFileImages] = useState<string[]>([]);
  const [fromLinkImages, setFromLinkImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [tags, setTags] = useState<ITag[]>([
    { name: "Skatepark", isSelected: false },
    { name: "Ledge", isSelected: false },
    { name: "Rail", isSelected: false },
    { name: "Stairs", isSelected: false },
    { name: "Bank", isSelected: false },
    { name: "Kicker", isSelected: false },
    { name: "Manualpad", isSelected: false },
    { name: "Flatground", isSelected: false },
    { name: "Quater", isSelected: false },
    { name: "Downhill", isSelected: false },
  ]);
  const [sendingSpot, setSendingSpot] = useState(false);

  const authState = useRootState().auth;
  const dispatch = useDispatch();

  const submitSpot = async () => {
    if (sendingSpot) return;

    setSendingSpot(true);
    const response = await sendSpotData(
      fromFileImages.concat(fromLinkImages),
      name,
      description,
      location,
      surfaceScore,
      tags,
      authState
    );
    setSendingSpot(false);

    if (response.error) {
      setError(response.error.message as string);
    } else {
      setError("");
      dispatch(
        createFlashMsgWithTimeout({
          clearAtDate: new Date(Date.now() + 10000),
          message: "Thank you! Your spot has been added to verification.",
          severity: "success",
        })
      );
    }
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
      {error !== "" && (
        <p className="text-sm text-danger">
          {error.split("\n").map((e) => (
            <p key={v4()}>{e}</p>
          ))}
        </p>
      )}
      <Button onClick={submitSpot} size="large" variant="contained">
        {sendingSpot ? <CircularProgress color="secondary" /> : "Submit"}
      </Button>
    </div>
  );
};

export default AddTempSpotPage;
