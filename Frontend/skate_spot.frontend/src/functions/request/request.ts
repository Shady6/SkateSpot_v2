import { ApiClient, ApiResponse } from "../../skate_spot_api/apiClient";
import {
  ApiException,
  ErrorCode,
  TokenResponse,
} from "../../skate_spot_api/client";

export const request = async <TReturn>(
  reqFunc: (client: ApiClient, token: string) => Promise<ApiResponse<TReturn>>,
  auth: TokenResponse | undefined
): Promise<ApiResponse<TReturn>> => {
  try {
    const response = await reqFunc(new ApiClient(), "Bearer " + auth?.jwToken);
    return response === undefined
      ? { content: undefined, error: undefined }
      : response;
  } catch (e) {
    if (e instanceof ApiException) return JSON.parse(e.response);

    return new Promise<ApiResponse<TReturn>>((resolve) => {
      resolve({
        content: undefined,
        error: {
          statusCode: ErrorCode.DEFAULT_ERROR,
        },
      });
    });
  }
};
