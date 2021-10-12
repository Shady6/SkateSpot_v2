import { Button } from "@material-ui/core";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export function VerificationButton({
  votesCount,
  votingReal,
}: {
  votesCount: number;
  votingReal: boolean;
}) {
  return (
    <Button
      size="small"
      variant="contained"
      color={votingReal ? "success" : "warning"}
      className="me-1"
    >
      {votingReal ? <ThumbUpIcon /> : <ThumbDownIcon />}{" "}
      <span className="ms-1">{votesCount}</span>
    </Button>
  );
}
