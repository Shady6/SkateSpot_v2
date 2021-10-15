import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNewTempSpots } from "../../../state/actions/tempSpotActions";
import { useRootState } from "../../../state/store";
import "./styles.scss";
import { TempSpot } from "./TempSpot";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const state = useRootState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewTempSpots());
  }, []);

  return (
    <>
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.tempSpots.tempSpots.data.map((t) => {
          return <TempSpot key={t.name} tempSpot={t} />;
        })}
        {state.tempSpots.loading && <CircularProgress color="secondary" />}
      </div>
    </>
  );
};

export default TempSpots;
