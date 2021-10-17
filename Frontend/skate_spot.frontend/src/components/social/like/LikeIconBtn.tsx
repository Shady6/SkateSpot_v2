import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import React from "react";
import { LikeButtonProps } from "./LikeButton";

const iconSx = { fontSize: "1.2rem" };

const LikeIconBtn: React.FC<LikeButtonProps> = ({
  likesCount,
  isPositive,
  onClick,
  highlited = false,
}) => {
  return (
    <div
      style={{ cursor: "pointer", color: "#e3e3e3" }}
      onClick={async () => await onClick()}
      className="me-3"
    >
      <span className="me-0">
        {isPositive ? (
          highlited ? (
            <ThumbUpIcon sx={iconSx} />
          ) : (
            <ThumbUpOffAltIcon sx={iconSx} />
          )
        ) : highlited ? (
          <ThumbDownIcon sx={iconSx} />
        ) : (
          <ThumbDownOffAltIcon sx={iconSx} />
        )}{" "}
      </span>

      <span style={{ color: "#dbd8d8", fontSize: "0.8rem" }} className="ms-0">
        {likesCount}
      </span>
    </div>
  );
};

export default LikeIconBtn;
