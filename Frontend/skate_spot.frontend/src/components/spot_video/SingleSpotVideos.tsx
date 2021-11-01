import { Button } from "@material-ui/core";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AddSpotVideoModal } from "./AddSpotVideoModal";

interface Props {}

export const SingleSpotVideos = (props: Props) => {
  const [isAddSpotVideoModalOpen, setIsAddSpotVideoModalOpen] = useState(false);
  const history = useHistory();

  const pathElements = history.location.pathname.split("/");
  const spotName = pathElements[pathElements.length - 2];

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <h3 className="me-3">Spot videos of {spotName}</h3>
        <Button
          onClick={() => setIsAddSpotVideoModalOpen(true)}
          variant="contained"
        >
          <VideoCallIcon />
        </Button>
      </div>
      <AddSpotVideoModal
        isOpen={isAddSpotVideoModalOpen}
        setIsOpen={setIsAddSpotVideoModalOpen}
      />
    </div>
  );
};
