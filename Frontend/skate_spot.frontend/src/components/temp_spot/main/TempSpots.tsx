import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { useRootState } from "../../../state/store";
import "../../spot_common/styles.scss";
import { TempSpot } from "./TempSpot";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import { getAllThunks } from "../../../state/actions/thunk_creators/allThunks";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const state = useRootState();
  useFetchOnScroll(
    getAllThunks().tempSpots.fetchListItems,
    ListViewTypes.TEMP_SPOTS
  );

  return (
    <>
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.tempSpotsState.listWithCount?.data?.map((t) => {
          return <TempSpot key={t.name} tempSpot={t} />;
        })}
        {state.tempSpotsState.loading && <CircularProgress color="secondary" />}
        {!state.tempSpotsState.loading &&
          !state.tempSpotsState.error &&
          state.tempSpotsState.listWithCount.data.length === 0 && (
            <p>There is no temp spots under verifcation right now.</p>
          )}
      </div>
    </>
  );
};

export default TempSpots;
