import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface FlashMsgState {
  message: string;
  level: "error" | "warning" | "info" | "success";
  clearsAfter: number;
}

const initialState: Partial<FlashMsgState> = {};

const flashMsgSlice = createSlice({
  name: "flashMsg",
  initialState,
  reducers: {
    setFlashMsg: (state, action: PayloadAction<FlashMsgState>) => {
      state = action.payload;
    },
    clearFlashMsg: (state) => {
      state = initialState;
    },
  },
});

export const createFlashMsgWithTimeout = createAsyncThunk<void, FlashMsgState>(
  "flashMsg/createFlashMsgWithTimeout",
  async (flashMsg: FlashMsgState, { dispatch }) => {
    dispatch(flashMsgSlice.actions.setFlashMsg(flashMsg));

    setTimeout(() => {
      dispatch(flashMsgSlice.actions.clearFlashMsg());
    }, flashMsg.clearsAfter);
  }
);
