import _ from "lodash";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { VerificationStatementDto } from "../../../skate_spot_api/client";
import { vote as voteAction } from "../../../state/actions/tempSpotActions";
import { useRootState } from "../../../state/store";
import { VerificationButton } from "./VerificationButton";

export function VerificationButtons({
  votes,
  tempSpotId,
}: {
  votes: VerificationStatementDto[];
  tempSpotId: string;
}) {
  const countRealVotes = useCallback(
    () => votes.reduce((prev, curr) => prev + Number(curr.isReal), 0),
    [votes]
  );

  const dispatch = useDispatch();
  const authState = useRootState().auth;

  const vote = async (isReal: boolean) => {
    const userPrevVote = _.first(
      votes.filter((v) => v.voterId === authState?.content?.id)
    );
    let deletedVote = false;
    if (userPrevVote && userPrevVote.isReal === isReal) deletedVote = true;

    dispatch(voteAction({ tempSpotId, isReal, deletedVote }));
  };

  return (
    <div>
      <div className="d-flex">
        <VerificationButton
          onClick={async () => await vote(true)}
          votingReal={true}
          votesCount={countRealVotes()}
        />
        <VerificationButton
          onClick={async () => await vote(false)}
          votingReal={false}
          votesCount={votes.length - countRealVotes()}
        />
      </div>
    </div>
  );
}
