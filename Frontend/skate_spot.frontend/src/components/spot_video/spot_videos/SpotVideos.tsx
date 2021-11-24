import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { getAllThunks } from "../../../state/actions/thunk_creators/allThunks";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import { useRootState } from "../../../state/store";
import { SpotVideo } from "./SpotVideo";

interface Props {}

export const SpotVideos = (p: Props) => {
  const state = useRootState();
  useFetchOnScroll(
    getAllThunks().spotVideos.fetchListItems,
    ListViewTypes.SPOT_VIDEOS
  );

  return (
    <div className="container mt-5" style={{ fontSize: "1rem" }}>
      {state.spotVideoState.listWithCount?.data?.map((t) => {
        return (
          <SpotVideo key={t.createdAt as unknown as string} spotVideo={t} />
        );
      })}
      {state.spotVideoState.loading && <CircularProgress color="secondary" />}
    </div>
  );
};
