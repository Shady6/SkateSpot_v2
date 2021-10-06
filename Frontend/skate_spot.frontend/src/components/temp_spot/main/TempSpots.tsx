import React from "react";
import { useEffect } from "react";
import { useRootState } from "../../../state/store";
import { sendRequestWithFlashMsgOnError } from "../../../functions/sendRequestWithFlashMsgOnError";
import { useDispatch } from "react-redux";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const authState = useRootState().auth;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   sendRequestWithFlashMsgOnError(
  //     dispatch,
  //     authState.content,
  //     (client, token) => client.get_With_Verification()
  //   );
  // }, []);

  return (
    <div>
      <h1>Hello from TempSpots component</h1>
    </div>
  );
};

export default TempSpots;
