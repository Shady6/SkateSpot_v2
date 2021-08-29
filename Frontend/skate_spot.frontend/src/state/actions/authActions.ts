import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../skate_spot_api/apiClient";
import {
  ApiException,
  ITokenRequest,
  ITokenResponse,
  TokenRequest,
} from "../../skate_spot_api/client";

export const localStorageJWTKey = "SkateSpotJWT";

export const login = createAsyncThunk<
  ITokenResponse,
  ITokenRequest,
  { rejectValue: string }
>("auth/login", async (loginData: ITokenRequest, { rejectWithValue }) => {
  try {
    const client = new ApiClient();
    const response = await client.get_Token(new TokenRequest(loginData));
    localStorage.setItem(
      localStorageJWTKey,
      response!.content!.jwToken as string
    );
    return response.content as ITokenResponse;
  } catch (e) {
    if (e instanceof ApiException)
      return rejectWithValue(JSON.parse(e.response).error.message as string);
    else throw e;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const jwt = localStorage.getItem(localStorageJWTKey);
  localStorage.removeItem(localStorageJWTKey);
  if (jwt) {
    const client = new ApiClient();
    await client.logout("Bearer " + jwt);
  }
});
