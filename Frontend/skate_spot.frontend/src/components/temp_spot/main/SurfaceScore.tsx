import { Chip } from "@material-ui/core";
import TextureIcon from "@mui/icons-material/Texture";
import React from "react";

export function SurfaceScore({ surfaceScore }: { surfaceScore: number }) {
  return (
    <div className="me-1">
      <Chip
        variant="outlined"
        label={`${surfaceScore}/10`}
        icon={<TextureIcon />}
      />
    </div>
  );
}
