import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FlashMsg {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  clearAtDate: Date;
}

export type FlashMsgState = FlashMsg | null;

const flashMsgSlice = createSlice({
  name: "flashMsg",
  initialState: null as FlashMsgState,
  reducers: {
    setFlashMsg: (state, action: PayloadAction<FlashMsg>) => {
      return action.payload;
    },
    clearFlashMsg: (state) => {
      return null;
    },
  },
});

export const createFlashMsgWithTimeout = createAsyncThunk<void, FlashMsg>(
  "flashMsg/createFlashMsgWithTimeout",
  async (flashMsg: FlashMsg, { dispatch, getState }) => {
    dispatch(flashMsgSlice.actions.setFlashMsg(flashMsg));

    const timeout = setTimeout(() => {
      const state = (getState() as RootState).flashMsg;

      if (state === null || state.clearAtDate === flashMsg.clearAtDate)
        dispatch(flashMsgSlice.actions.clearFlashMsg());

      clearTimeout(timeout);
    }, flashMsg.clearAtDate.getTime() - Date.now());
  }
);

export const { clearFlashMsg } = flashMsgSlice.actions;
export default flashMsgSlice.reducer;
