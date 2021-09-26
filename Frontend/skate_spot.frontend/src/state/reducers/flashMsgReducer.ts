import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FlashMsg {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  clearAtDate: Date;
}

const flashMsgSlice = createSlice({
  name: "flashMsg",
  initialState: [] as FlashMsg[],
  reducers: {
    setFlashMsg: (state, action: PayloadAction<FlashMsg>) => {
      state.push(action.payload);
    },
    clearFlashMsg: (state, action: PayloadAction<Date>) => {
      return state.filter((f) => f.clearAtDate !== action.payload);
    },
  },
});

export const createFlashMsgWithTimeout = createAsyncThunk<void, FlashMsg>(
  "flashMsg/createFlashMsgWithTimeout",
  async (flashMsg: FlashMsg, { dispatch }) => {
    dispatch(flashMsgSlice.actions.setFlashMsg(flashMsg));

    const timeout = setTimeout(() => {
      dispatch(flashMsgSlice.actions.clearFlashMsg(flashMsg.clearAtDate));

      clearTimeout(timeout);
    }, flashMsg.clearAtDate.getTime() - Date.now());
  }
);

export const { clearFlashMsg } = flashMsgSlice.actions;
export default flashMsgSlice.reducer;
