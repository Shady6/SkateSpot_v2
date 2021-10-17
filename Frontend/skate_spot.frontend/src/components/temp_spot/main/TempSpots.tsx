import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNewTempSpots } from "../../../state/actions/tempSpotActions";
import { useRootState } from "../../../state/store";
import "./styles.scss";
import { TempSpot } from "./TempSpot";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const state = useRootState();
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrolled(
        document.documentElement.scrollTop /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight)
      );
    });
    dispatch(fetchNewTempSpots());
  }, []);

  useEffect(() => {
    if (
      !state.tempSpotsState.loading &&
      state?.tempSpotsState?.listWithCount?.data?.length <
        state.tempSpotsState.listWithCount.totalCount &&
      scrolled >= 0.8 &&
      scrolled <= 1
    )
      dispatch(fetchNewTempSpots());
  }, [scrolled]);

  return (
    <>
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.tempSpotsState.listWithCount?.data?.map((t) => {
          return <TempSpot key={t.name} tempSpot={t} />;
        })}
        {state.tempSpotsState.loading && <CircularProgress color="secondary" />}
      </div>
    </>
  );
};

export default TempSpots;
