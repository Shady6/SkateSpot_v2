import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { useOneSpot } from "../../../hooks/useOneSpot";
import { Routes } from "../../../routes/appRoutes";
import { ApiResponse } from "../../../skate_spot_api/apiClient";
import { customFuncSpotVideoFetch } from "../../../state/actions/spotVideoActions";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import {
  ListWithCount,
  WithSocial,
} from "../../../state/reducers/genericListViewReducer";
import { spotVideoActions } from "../../../state/reducers/spotVideoReducer";
import { useRootState } from "../../../state/store";
import { SpotVideo } from "../../spot_video/videos_of_spot/SpotVideo";
import { SpotDetails } from "./SpotDetails";

interface Props {}

export const SpotPage: React.FC<Props> = () => {
  const state = useRootState();
  const dispatch = useDispatch();

  const history = useHistory();
  const path = history.location.pathname.split("/");
  const spotPathPart = Routes.SPOTS.replace("/", "");
  const spotName = path[path.indexOf(spotPathPart) + 1];
  useOneSpot(spotName);

  const spot = state.spotsState.listWithCount.data?.[0];

  useEffect(() => {
    dispatch(spotVideoActions.reset());

    return () => {
      dispatch(spotVideoActions.reset());
    };
  }, []);

  useFetchOnScroll(() => {
    return customFuncSpotVideoFetch({
      fetchFunc: (client, take, skip) =>
        client.get_Spot_Videos_Of_Spot(
          spotName,
          take,
          skip,
          undefined
        ) as Promise<ApiResponse<ListWithCount<WithSocial>>>,
    });
  }, ListViewTypes.SPOT_VIDEOS);

  return (
    <div className="container mt-5" style={{ fontSize: "1rem" }}>
      <div>{spot && <SpotDetails spot={spot} />}</div>
      <div>
        <h4 className="mb-5">Videos</h4>
        {state.spotVideoState.listWithCount?.data?.map((t) => {
          return (
            <SpotVideo key={t.createdAt as unknown as string} spotVideo={t} />
          );
        })}
        {state.spotVideoState.loading && <CircularProgress color="secondary" />}
      </div>
    </div>
  );
};
