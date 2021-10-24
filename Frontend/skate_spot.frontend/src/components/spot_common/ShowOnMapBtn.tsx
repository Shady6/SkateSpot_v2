import { Button } from "@material-ui/core";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";

interface Props {
  onClick: () => void;
}

export function ShowOnMapBtn({ onClick }: Props) {
  return (
    <div>
      <Button onClick={onClick} size="small" variant="contained">
        <RoomIcon />
      </Button>
    </div>
  );
}
