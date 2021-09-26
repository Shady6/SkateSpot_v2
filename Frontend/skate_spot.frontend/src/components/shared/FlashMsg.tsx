import Alert from "@material-ui/core/Alert";
import React from "react";
import { clearFlashMsg } from "../../state/reducers/flashMsgReducer";
import { useAppDispatch, useRootState } from "../../state/store";
import { PredefinedTimeProgress } from "./PredefinedTimeProgress";

interface Props {}

const FlashMsg: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const state = useRootState();

  return state.flashMsg ? (
    <Alert
      variant="filled"
      style={{ position: "fixed", zIndex: 1000, opacity: 0.95 }}
      severity={state.flashMsg.severity}
      onClose={() => dispatch(clearFlashMsg())}
    >
      {state.flashMsg.message}
      <PredefinedTimeProgress
        clearDate={state.flashMsg.clearAtDate.getTime()}
      />
    </Alert>
  ) : (
    <></>
  );
};

export default FlashMsg;
