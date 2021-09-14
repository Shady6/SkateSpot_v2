import { Dispatch } from "react";
import { ApiException, ErrorResponse } from "../skate_spot_api/client";
import { createFlashMsgWithTimeout } from "../state/reducers/flashMsgReducer";

export const sendRequestWithErrorHandling = async <TReturn>(
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
        level: "error",
        clearsAfter: clearAfter,
      })
    );
    return { success: false, response: undefined };
  }
};
