import { Button } from "@material-ui/core";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

export interface LikeButtonProps {
  likesCount: number;
  isPositive: boolean;
  onClick: () => void;
  highlited?: boolean;
}

export function VerificationButton({
  likesCount: votesCount,
  isPositive: votingReal,
  onClick,
  highlited = false,
}: LikeButtonProps) {
  return (
    <Button
      onClick={async () => await onClick()}
      size="small"
      variant={highlited ? "contained" : "outlined"}
      color={votingReal ? "success" : "warning"}
      className="me-1"
    >
      {votingReal ? <ThumbUpIcon /> : <ThumbDownIcon />}{" "}
      <span className="ms-1">{votesCount}</span>
    </Button>
  );
}
