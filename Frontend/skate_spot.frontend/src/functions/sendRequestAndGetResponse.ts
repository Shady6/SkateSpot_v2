import { ApiResponse } from "../skate_spot_api/apiClient";
import {
  ApiException,
  ErrorResponse,
  ITokenResponse,
} from "../skate_spot_api/client";

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
