import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { ITokenResponse } from '../../skate_spot_api/client';
import { login, logout, setAuthStateFromLocalStorage } from '../actions/authActions';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
type AsyncThunkAction = PendingAction | RejectedAction | FulfilledAction

export interface AuthState {
    content?: ITokenResponse,
    error?: string,
    loading: boolean
}

const initialState: AuthState = { loading: false };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<ITokenResponse>) => {
            updateStateFromITokenResponse(state, action)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                updateStateFromITokenResponse(state, action)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Something went wrong"
            })
            .addCase(setAuthStateFromLocalStorage, (state, action) => {
                updateStateFromITokenResponse(state, action)
            })
            .addCase(logout.pending, () => {
                return initialState
            })
    }
})

const updateStateFromITokenResponse = (state: WritableDraft<AuthState>, action: PayloadAction<ITokenResponse>) => {
    if (!Array.isArray(action.payload.roles))
        action.payload.roles = [action.payload.roles as unknown as string]
    state.content = action.payload
    state.loading = false
}

export const { loginSuccess } = authSlice.actions
export default authSlice.reducer