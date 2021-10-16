import { Dispatch } from "react";
import { ApiClient, ApiResponse } from "../skate_spot_api/apiClient";
import { ErrorCode, TokenResponse } from "../skate_spot_api/client";
import { createFlashMsgWithTimeout } from "../state/reducers/flashMsgReducer";
import { request } from "./request";

export const sendRequestWithFlashMsgOnError = async <TReturn>(
  dispatch: Dispatch<any>,
  auth: TokenResponse | undefined,
  reqFunc: (client: ApiClient, token: string) => Promise<ApiResponse<TReturn>>,
  backupErrorMessage?: string,
  clearAfterMs: number = 10000
): Promise<ApiResponse<TReturn>> => {
  const response = await request(reqFunc, auth);

  if (response.content) return response;

  dispatch(
    createFlashMsgWithTimeout({
      message:
        response.error?.statusCode !== ErrorCode.DEFAULT_ERROR
          ? (response.error?.message as string)
          : backupErrorMessage || "Something went wrong, try again later.",
      severity: "error",
      clearAtDate: new Date(Date.now() + clearAfterMs),
    })
  );
  return response;
};
