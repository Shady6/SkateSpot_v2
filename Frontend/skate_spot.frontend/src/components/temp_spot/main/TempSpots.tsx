import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ObstacleType,
  SmallUserDto,
  VerificationStatementDto,
} from "../../../skate_spot_api/client";
import { fetchNewTempSpots } from "../../../state/actions/tempSpotActions";
import { useRootState } from "../../../state/store";
import { Obstacles } from "./Obstacles";
import { SpotAuthor } from "./SpotAuthor";
import { SpotImages } from "./SpotImages";
import "./styles.scss";
import { SurfaceScore } from "./SurfaceScore";
import { TempSpotDetailsBtn } from "./TempSpotDetailsBtn";
import { VerificationButtons } from "./VerificationButtons";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const state = useRootState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewTempSpots());
  }, []);

  return (
    <div className="container mt-5" style={{ fontSize: "1rem" }}>
      {state.tempSpots.tempSpots.data.map((t, i) => {
        return (
          <div key={t.name} className="mb-4">
            <h4>{t.name}</h4>
            <SpotImages tempSpot={t} />
            <div className="d-flex mt-2">
              <VerificationButtons
                votes={
                  t!.verificationProcess!.votes as VerificationStatementDto[]
                }
              />
              <SurfaceScore surfaceScore={t.surfaceScore as number} />
              <Obstacles obstacles={t.obstacles as ObstacleType[]} />
              <TempSpotDetailsBtn />
              <SpotAuthor author={t.author as SmallUserDto} />
            </div>
            <hr />
          </div>
        );
      })}
      {state.tempSpots.loading && <CircularProgress color="secondary" />}
    </div>
  );
};

export default TempSpots;
