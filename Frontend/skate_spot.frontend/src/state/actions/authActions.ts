import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiClient } from '../../skate_spot_api/apiClient'
import {
  ApiException,
  TokenRequest,
  TokenResponse,
} from '../../skate_spot_api/client'

export const localStorageJWTKey = 'SkateSpotJWT'

export const login = createAsyncThunk<
  TokenResponse,
  TokenRequest,
  { rejectValue: string }
>('auth/login', async (loginData: TokenRequest, { rejectWithValue }) => {
  try {
    const client = new ApiClient()
    const response = await client.get_Token(loginData)
    localStorage.setItem(
      localStorageJWTKey,
      response!.content!.jwToken as string
    )
    return response.content as TokenResponse
  } catch (e) {
    if (e instanceof ApiException)
      return rejectWithValue(JSON.parse(e.response).error.message as string)
    else throw e
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const jwt = localStorage.getItem(localStorageJWTKey)
  localStorage.removeItem(localStorageJWTKey)
  if (jwt) {
    const client = new ApiClient()
    await client.logout('Bearer ' + jwt)
  }
})
