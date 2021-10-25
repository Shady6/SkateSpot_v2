import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../../hooks/useFetchOnScroll";
import { useRootState } from "../../../state/store";
import "../../spot_common/styles.scss";
import { TempSpot } from "./TempSpot";
import { tempSpotFetch } from "../../../state/actions/tempSpotActions";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const state = useRootState();
  useFetchOnScroll(tempSpotFetch);

  return (
    <>
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.tempSpotsState.listWithCount?.data?.map((t) => {
          return <TempSpot key={t.name} tempSpot={t} />;
        })}
        {state.tempSpotsState.loading && <CircularProgress color="secondary" />}
        {!state.tempSpotsState.loading && !state.tempSpotsState.error && (
          <p>There is no temp spots under verifcation right now.</p>
        )}
      </div>
    </>
  );
};

export default TempSpots;
