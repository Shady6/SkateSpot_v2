import { CircularProgress } from "@material-ui/core";
import React, {useState} from "react";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { customFuncSpotVideoFetch } from "../../../state/actions/spotVideoActions";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import { SpotVideo } from "./SpotVideo";
import { WithSocial, ListWithCount } from '../../../state/reducers/genericListViewReducer';
import { useHistory } from "react-router-dom";

interface Props {}

export const SpotVideos = (p: Props) => {
  const [isAddSpotVideoModalOpen, setIsAddSpotVideoModalOpen] = useState(false);
  const history = useHistory();

  const pathElements = history.location.pathname.split("/");
  const spotName = pathElements[pathElements.length - 2];

  useFetchOnScroll(
    () => {return customFuncSpotVideoFetch({
        fetchFunc: (client, take, skip) =>
          client.get_Spot_Videos_Of_Spot(spotName, take, skip, undefined) as unknown as as Promise<ApiResponse<ListWithCount<WithSocial>>>,
      })}      
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
