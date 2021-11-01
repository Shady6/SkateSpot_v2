import { Box, Button, Modal, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useInputState } from "../../hooks/util/useInputState";
import { createFlashMsgWithTimeout } from "../../state/reducers/flashMsgReducer";
import { ModalStyle } from "../spot_common/MapModal";
import { InstagramVideo } from "./InstagramVideo";
import { YouTubeVideo } from "./YouTubeVideo";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddSpotVideoModal = (p: Props) => {
  const [videoUrl, setVideoUrl, resetVideoUrl] = useInputState("");
  const [description, setDescription, resetDescription] = useInputState("");
  const [video, setVideo] = useState<{
    type: "instagram" | "youtube";
    id: string;
  } | null>(null);
  const dispatch = useDispatch();

  const handleLoadClick = () => {
    setVideo(null);
    let id = "";
    try {
      if (videoUrl.indexOf("youtube") !== -1) {
        id = videoUrl.slice(videoUrl.indexOf("?v=") + 3);
        if (id.indexOf("/") !== -1) id = id.slice(0, id.indexOf("/"));
        if (id) setVideo({ type: "youtube", id });
      } else if (videoUrl.indexOf("instagram") !== -1) {
        id = videoUrl.slice(videoUrl.indexOf("/p/") + 3);
        if (id.indexOf("/") !== -1) id = id.slice(0, id.indexOf("/"));
        if (id) setVideo({ type: "instagram", id });
      }
    } catch {
      flashInvalidUrl();
    } finally {
      if (!id) flashInvalidUrl();
    }
  };

  const flashInvalidUrl = () => {
    dispatch(
      createFlashMsgWithTimeout({
        message: "The url is invalid.",
        severity: "warning",
      })
    );
  };

  return (
    <Modal
      style={{ cursor: "pointer" }}
      open={p.isOpen}
      onClose={() => p.setIsOpen(false)}
    >
      {/* @ts-ignore */}
      <Box sx={ModalStyle}>
        <div>
          <div className="d-flex">
            <div className="col-5 me-2">
              <TextField
                value={videoUrl}
                onChange={setVideoUrl}
                fullWidth
                label="Copy and paste link to a Instagram or YouTube video "
                variant="standard"
              />
            </div>
            <Button onClick={handleLoadClick} size="small" variant="contained">
              Load
            </Button>
          </div>
          {video && (
            <div className="mt-4" style={{ fontSize: "1.10rem" }}>
              <p>
                This is the preview of the video. If you can see it you are good
                to go otherwise please insert correct link.
              </p>
              {video.type === "instagram" ? (
                <InstagramVideo videoId={video.id} />
              ) : (
                <YouTubeVideo videoId={video.id} />
              )}
              <div className="col-5 mt-2 mb-3">
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
            </div>
          )}
          <div className="mt-2">
            <Button
              disabled={!video}
              className="me-2"
              color="primary"
              variant="contained"
              onClick={() => {
                resetVideoUrl();
                resetDescription();
                p.setIsOpen(false);

                // add video here to db

                setVideo(null);
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                setVideo(null);
                resetVideoUrl();
                resetDescription();
                p.setIsOpen(false);
              }}
              color="warning"
              variant="contained"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
