import React from "react";
import { useLikes } from "../../../../hooks/useLikes";
import { VerificationStatementDto } from "../../../../skate_spot_api/client";
import { vote } from "../../../../state/actions/tempSpotActions";
import { LikeButton } from "../../../social/like/LikeButton";

export function VerificationButtons({
  votes,
  tempSpotId,
}: {
  votes: VerificationStatementDto[];
  tempSpotId: string;
}) {
  const buttonsProps = useLikes({
    subjectId: tempSpotId,
    likes:
      votes?.map((v) => ({
        userId: v.voterId as string,
        isPositive: v.isReal as boolean,
      })) || [],
    likeAction: (tempSpotId, isPositive, deletedLike) =>
      vote({ tempSpotId, isReal: isPositive, deletedVote: deletedLike }),
  });

  return (
    <div>
      {buttonsProps.map((props) => (
        <LikeButton key={props.isPositive.toString()} {...props} />
      ))}
    </div>
  );
}
