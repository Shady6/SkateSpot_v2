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

export const createFlashMsgWithTimeout = createAsyncThunk(
  "flashMsg/createFlashMsgWithTimeout",
  async (
    flashMsg: {
      message: string;
      severity: "error" | "warning" | "info" | "success";
      clearAtDate?: Date;
    },
    { dispatch }
  ) => {
    flashMsg.clearAtDate ??= new Date(Date.now() + 10000);

    dispatch(flashMsgSlice.actions.setFlashMsg(flashMsg as FlashMsg));
    const timeout = setTimeout(() => {
      dispatch(
        flashMsgSlice.actions.clearFlashMsg(flashMsg.clearAtDate as Date)
      );

      clearTimeout(timeout);
    }, flashMsg.clearAtDate.getTime() - Date.now());
  }
);

export const { clearFlashMsg } = flashMsgSlice.actions;
export default flashMsgSlice.reducer;
