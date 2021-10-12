import React, { useCallback } from "react";
import { IVerificationStatementDto } from "../../../skate_spot_api/client";
import { VerificationButton } from "./VerificationButton";

export function VerificationButtons({
  votes,
}: {
  votes: IVerificationStatementDto[];
}) {
  const countRealVotes = useCallback(
    () => votes.reduce((prev, curr) => prev + Number(curr.isReal), 0),
    [votes]
  );

  return (
    <div>
      <div className="d-flex">
        <VerificationButton votingReal={true} votesCount={countRealVotes()} />
        <VerificationButton
          votingReal={false}
          votesCount={votes.length - countRealVotes()}
        />
      </div>
    </div>
  );
}
