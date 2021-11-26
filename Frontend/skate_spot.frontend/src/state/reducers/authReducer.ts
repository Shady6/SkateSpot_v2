import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/types/types-external'
import { TokenResponse } from '../../skate_spot_api/client'
import { login, logout } from '../actions/authActions'

export interface AuthState {
  content?: TokenResponse
  error?: string
  loading: boolean
}

const initialState: AuthState = { loading: false }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStateFromLocalStorage: (
      state,
      action: PayloadAction<TokenResponse>
    ) => {
      updateStateFromITokenResponse(state, action)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        updateStateFromITokenResponse(state, action)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Something went wrong'
      })
      .addCase(logout.pending, () => {
        return initialState
      })
  },
})

const updateStateFromITokenResponse = (
  state: WritableDraft<AuthState>,
  action: PayloadAction<TokenResponse>
) => {
  if (!Array.isArray(action.payload.roles))
    action.payload.roles = [action.payload.roles as unknown as string]
  state.content = action.payload
  state.loading = false
}

export const { setAuthStateFromLocalStorage } = authSlice.actions
export default authSlice.reducer
