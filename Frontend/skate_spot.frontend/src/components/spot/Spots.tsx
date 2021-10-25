import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../hooks/useFetchOnScroll";
import { spotFetch } from "../../state/actions/spotAcionts";
import { useRootState } from "../../state/store";
import "../spot_common/styles.scss";
import { Spot } from "./Spot";

interface Props {}

const Spots: React.FC<Props> = () => {
  const state = useRootState();
  useFetchOnScroll(spotFetch);

  return (
    <>
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.spotsState.listWithCount?.data?.map((t) => {
          return <Spot key={t.name} spot={t} />;
        })}
        {state.tempSpotsState.loading && <CircularProgress color="secondary" />}
      </div>
    </>
  );
};

export default Spots;