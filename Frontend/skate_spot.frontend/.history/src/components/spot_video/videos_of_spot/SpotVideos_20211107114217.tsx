import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { spotVideoFetch } from "../../../state/actions/spotVideoActions";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import { useRootState } from "../../../state/store";
import { SpotVideo } from "./SpotVideo";

interface Props {}

export const SpotVideos = (p: Props) => {
  const state = useRootState();
  useFetchOnScroll(spotVideoFetch, ListViewTypes.SPOT_VIDEOS);

  return (
    <div className="container mt-5">
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.spotVideoState.listWithCount?.data?.map((t) => {
          return (
            <SpotVideo key={t.createdAt as unknown as string} spotVideo={t} />
          );
        })}
        {state.tempSpotsState.loading && <CircularProgress color="secondary" />}
      </div>
    </div>
  );
};
