import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
}

export const SpotVideoBtn = (p: Props) => {
  return (
    <div>
      <Button
        onClick={p.onClick}
        variant="outlined"
        size="small"
        className="me-1"
      >
        <VideocamIcon className="me-1" />
      </Button>
    </div>
  );
};
