import Chip from "@mui/material/Chip";
import React from "react";
import { v4 } from "uuid";
import { ObstacleType } from "../../skate_spot_api/client";

export function Obstacles({ obstacles }: { obstacles: ObstacleType[] }) {
  return (
    <div>
      {obstacles?.map((o) => (
        <Chip label={o} variant="outlined" className="me-1" key={v4()} />
      ))}
    </div>
  );
}
