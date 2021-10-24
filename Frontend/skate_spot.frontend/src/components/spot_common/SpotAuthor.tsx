import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { SmallUserDto } from "../../skate_spot_api/client";

export function SpotAuthor({ author }: { author: SmallUserDto }) {
  return (
    <div style={{ marginLeft: "auto" }}>
      <PersonIcon /> {author?.userName}
    </div>
  );
}
