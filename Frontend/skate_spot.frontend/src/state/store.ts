import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import flashMsgReducer from "./reducers/flashMsgReducer";
import tempSpotsReducer from "./reducers/tempSpotsReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    flashMsgs: flashMsgReducer,
    tempSpots: tempSpotsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useRootState = () => useSelector((state: RootState) => state);
