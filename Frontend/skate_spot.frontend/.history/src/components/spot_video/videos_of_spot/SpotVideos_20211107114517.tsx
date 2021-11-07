import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import {
  spotVideoFetch,
  customFuncSpotVideoFetch,
} from "../../../state/actions/spotVideoActions";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import { useRootState } from "../../../state/store";
import { SpotVideo } from "./SpotVideo";

interface Props {}

export const SpotVideos = (p: Props) => {
  const [isAddSpotVideoModalOpen, setIsAddSpotVideoModalOpen] = useState(false);
  const history = useHistory();

  const pathElements = history.location.pathname.split("/");
  const spotName = pathElements[pathElements.length - 2];
  useFetchOnScroll(
    customFuncSpotVideoFetch({
      fetchFunc: (client, take, skip) => client.get_Spot_Videos_Of_Spot(),
    }),
    ListViewTypes.SPOT_VIDEOS
  );

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
