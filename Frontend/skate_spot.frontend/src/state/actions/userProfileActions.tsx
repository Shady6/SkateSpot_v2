import { createAsyncThunk } from '@reduxjs/toolkit'
export const loadStats = createAsyncThunk(
  'userProfile/getStats',
  async (_, { getState, dispatch, rejectWithValue }) => {}
)
