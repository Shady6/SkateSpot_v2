import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/types/types-external'
import { TokenResponse } from '../../skate_spot_api/client'
import { login, logout, register } from '../actions/authActions'

export interface AuthState {
  content?: TokenResponse
  loginLoading: boolean
  registerSuccess: boolean
  registerLoading: boolean
}

const initialState: AuthState = {
  loginLoading: false,
  registerSuccess: false,
  registerLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStateFromLocalStorage: (
      state,
      action: PayloadAction<TokenResponse>
    ) => {
      updateStateFromITokenResponse(state, action.payload as TokenResponse)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loginLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        updateStateFromITokenResponse(state, action.payload as TokenResponse)
      })
      .addCase(login.rejected, state => {
        state.loginLoading = false
      })
      .addCase(register.pending, state => {
        state.registerLoading = true
      })
      .addCase(register.fulfilled, state => {
        state.registerSuccess = true
        state.registerLoading = false
      })
      .addCase(register.rejected, state => {
        state.registerLoading = false
      })
      .addCase(logout.pending, () => {
        return initialState
      })
  },
})

const updateStateFromITokenResponse = (
  state: WritableDraft<AuthState>,
  payload: TokenResponse
) => {
  if (!Array.isArray(payload.roles))
    payload.roles = [payload.roles as unknown as string]
  state.content = payload
  state.loginLoading = false
}

export const { setAuthStateFromLocalStorage } = authSlice.actions
export default authSlice.reducer
