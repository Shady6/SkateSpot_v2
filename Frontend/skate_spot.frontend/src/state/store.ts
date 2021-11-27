import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authReducer from './reducers/authReducer'
import filtersReducer from './reducers/filtersReducer'
import flashMsgReducer from './reducers/flashMsgReducer'
import spotsReducer from './reducers/spotReducer'
import spotVideoReducer from './reducers/spotVideoReducer'
import tempSpotsReducer from './reducers/tempSpotsReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    flashMsgs: flashMsgReducer,
    tempSpotsState: tempSpotsReducer,
    spotsState: spotsReducer,
    spotVideosState: spotVideoReducer,
    filtersState: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useRootState = () => useSelector((state: RootState) => state)
