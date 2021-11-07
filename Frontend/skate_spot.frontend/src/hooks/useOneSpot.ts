import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendRequestWithFlashMsgOnError } from "../functions/request/sendRequestWithFlashMsgOnError";
import { SpotDto } from "../skate_spot_api/client";
import { spotActions } from "../state/reducers/spotReducer";
import { useRootState } from "../state/store";

export const useOneSpot = (spotName: string) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useRootState();

  useEffect(() => {
    dispatch(spotActions.reset());

    const spot = (history.location.state as { spot: SpotDto | undefined })
      ?.spot;
    if (spot && spot.videosCount) dispatch(spotActions.setSpots([spot]));
    else
      (async () => {
        const res = await sendRequestWithFlashMsgOnError(
          dispatch,
          state.auth.content,
          (c, t) => c.get_Spot(spotName)
        );

        if (res.content) dispatch(spotActions.setSpots([res.content]));
      })();

    return () => {
      dispatch(spotActions.reset());
    };
  }, []);
};
