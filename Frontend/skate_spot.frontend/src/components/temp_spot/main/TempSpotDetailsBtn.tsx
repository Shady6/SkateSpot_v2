import { Button } from "@material-ui/core";
import React from "react";
import RoomIcon from "@mui/icons-material/Room";

interface Props {
  onClick: () => void;
}

export function TempSpotDetailsBtn({ onClick }: Props) {
  return (
    <div>
      <Button onClick={onClick} size="small" variant="contained">
        <RoomIcon />
      </Button>
    </div>
  );
}
