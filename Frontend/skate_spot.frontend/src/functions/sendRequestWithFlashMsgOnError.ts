import { Dispatch } from "react";
import { ApiClient, ApiResponse } from "../skate_spot_api/apiClient";
import { ITokenResponse } from "../skate_spot_api/client";
import { createFlashMsgWithTimeout } from "../state/reducers/flashMsgReducer";
import { request } from "./request";

export const sendRequestWithFlashMsgOnError = async <TReturn>(
  dispatch: Dispatch<any>,
  auth: ITokenResponse | undefined,
  reqFunc: (client: ApiClient, token: string) => Promise<ApiResponse<TReturn>>,
  customErrorMessage?: string,
  clearAfterMs: number = 10000
): Promise<ApiResponse<TReturn>> => {
  const response = await request(reqFunc, auth);

  if (response.content) return response;

  dispatch(
    createFlashMsgWithTimeout({
      message: customErrorMessage || (response.error!.message as string),
      severity: "error",
      clearAtDate: new Date(Date.now() + clearAfterMs),
    })
  );
  return response;
};
