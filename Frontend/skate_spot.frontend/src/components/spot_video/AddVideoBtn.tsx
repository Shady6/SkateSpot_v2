import React from "react";
import AddVideoIcon from "@mui/icons-material/VideoCall";
import Button from "@mui/material/Button";

interface Props {
  setIsAddSpotVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddVideoBtn: React.FC<Props> = (p) => {
  return (
    <div>
      <Button
        size="small"
        onClick={() => p.setIsAddSpotVideoModalOpen(true)}
        variant="contained"
      >
        <AddVideoIcon />
      </Button>
    </div>
  );
};
