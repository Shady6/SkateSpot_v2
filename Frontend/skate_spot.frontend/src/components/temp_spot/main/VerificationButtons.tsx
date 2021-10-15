import _ from "lodash";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { sendRequestWithFlashMsgOnError } from "../../../functions/sendRequestWithFlashMsgOnError";
import { VerificationStatementDto } from "../../../skate_spot_api/client";
import { createFlashMsgWithTimeout } from "../../../state/reducers/flashMsgReducer";
import { updateVotes } from "../../../state/reducers/tempSpotsReducer";
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
    if (!authState.content) {
      dispatch(
        createFlashMsgWithTimeout({
          message: "You need to be logged in to vote",
          severity: "info",
        })
      );
      return;
    }

    const userPrevVote = _.first(
      votes.filter((v) => v.voterId === authState.content!.id)
    );
    let deletedVote = false;
    if (userPrevVote && userPrevVote.isReal === isReal) deletedVote = true;

    const response = await sendRequestWithFlashMsgOnError(
      dispatch,
      authState.content,
      (client, token) =>
        deletedVote
          ? client.delete_Vote(tempSpotId, token)
          : client.vote(tempSpotId, token, { isReal: isReal })
    );

    if (!response.error)
      dispatch(
        updateVotes({
          tempSpotId,
          voterId: authState.content.id as string,
          deletedVote,
          isReal,
        })
      );
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
