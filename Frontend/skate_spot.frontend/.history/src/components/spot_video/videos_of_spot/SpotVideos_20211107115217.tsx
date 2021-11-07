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

interface Props {}

export const SpotVideos = (p: Props) => {
  const [isAddSpotVideoModalOpen, setIsAddSpotVideoModalOpen] = useState(false);
  const history = useHistory();
  const state = useRootState().spotVideoState;

  const pathElements = history.location.pathname.split("/");
  const spotName = pathElements[pathElements.length - 2];

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
      <SpotVideoHeader />
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
