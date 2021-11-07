import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { ApiResponse } from "../../../skate_spot_api/apiClient";
import { customFuncSpotVideoFetch } from "../../../state/actions/spotVideoActions";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import {
  ListWithCount,
  WithSocial,
} from "../../../state/reducers/genericListViewReducer";
import { useRootState } from "../../../state/store";
import { SpotVideo } from "./SpotVideo";
import { SpotVideoHeader } from "./SpotVideoHeader";
import { SpotDto } from "../../../skate_spot_api/client";

interface Props {}

export const SpotVideos = (p: Props) => {
  const history = useHistory();
  const state = useRootState().spotVideoState;

  const pathElements = history.location.pathname.split("/");
  const spotName = pathElements[pathElements.length - 2];
  const spot = (history.location.state as { spot: SpotDto }).spot;

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
    <div className="container mt-5">
      <div className="mb-5">
        <SpotVideoHeader spot={spot} />
      </div>
      <div style={{ fontSize: "1rem" }}>
        {state.listWithCount?.data?.map((t) => {
          return (
            <SpotVideo key={t.createdAt as unknown as string} spotVideo={t} />
          );
        })}
        {state.loading && <CircularProgress color="secondary" />}
      </div>
    </div>
  );
};
