import { Button } from "@material-ui/core";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export function VerificationButton({
  votesCount,
  votingReal,
  onClick,
}: {
  votesCount: number;
  votingReal: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={async () => await onClick()}
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
