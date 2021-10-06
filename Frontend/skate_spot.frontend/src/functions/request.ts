import { ApiResponse, ApiClient } from "../skate_spot_api/apiClient";
import {
  ApiException,
  ErrorResponse,
  ITokenResponse,
} from "../skate_spot_api/client";

export const request = async <TReturn>(
  reqFunc: (client: ApiClient, token: string) => Promise<ApiResponse<TReturn>>,
  auth: ITokenResponse | undefined
): Promise<ApiResponse<TReturn>> => {
  try {
    const response = await reqFunc(new ApiClient(), "Bearer " + auth?.jwToken);
    return response;
  } catch (e) {
    if (e instanceof ApiException) return JSON.parse(e.response);

    return new Promise<ApiResponse<TReturn>>((resolve) => {
      resolve({
        content: undefined,
        error: new ErrorResponse({
          message: "Oops, something went wrong. Try again later.",
        }),
      });
    });
  }
};
