import { Dispatch } from "react";
import {
  ApiException,
  ErrorResponse,
  ITokenResponse,
} from "../skate_spot_api/client";
import { createFlashMsgWithTimeout } from "../state/reducers/flashMsgReducer";
import { IErrorResponse } from "../skate_spot_api/client";

export const sendRequestWithFlashMsgOnError = async <TReturn>(
  dispatch: Dispatch<any>,
  reqFunc: () => Promise<TReturn>,
  clearAfter: number
): Promise<{ success: boolean; response: TReturn | undefined }> => {
  try {
    const response = await reqFunc();
    return { success: true, response };
  } catch (e) {
    let errorMessage = "Oops, something went wrong. Try again later.";

    if (e instanceof ApiException) {
      const errorResponse = JSON.parse(e.response).error as ErrorResponse;
      errorMessage = errorResponse.message as string;
    }
    dispatch(
      createFlashMsgWithTimeout({
        message: errorMessage,
        severity: "error",
        clearAtDate: new Date(Date.now() + clearAfter),
      })
    );
    return { success: false, response: undefined };
  }
};

type ApiResponse<T> = {
  content?: T;
  error?: IErrorResponse;
};

export const sendRequestAndGetResponse = async <T>(
  reqFunc: (token: string) => Promise<ApiResponse<T>>,
  auth?: ITokenResponse
): Promise<ApiResponse<T>> => {
  try {
    const response = await reqFunc("Bearer " + auth?.jwToken);
    return response;
  } catch (e) {
    if (e instanceof ApiException) return JSON.parse(e.response);

    return new Promise<ApiResponse<T>>((resolve, reject) => {
      resolve({
        content: undefined,
        error: new ErrorResponse({
          message: "Oops, something went wrong. Try again later.",
        }),
      });
    });
  }
};
