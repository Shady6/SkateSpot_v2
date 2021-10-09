import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRootState } from "../../../state/store";
import ImageGallery from "react-image-gallery";
import Countdown from "react-countdown";
import { v4 } from "uuid";
import { fetchNewTempSpots } from "../../../state/actions/tempSpotActions";
import "./styles.scss";

interface Props {}

const TempSpots: React.FC<Props> = () => {
  const state = useRootState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewTempSpots());
  }, []);

  return (
    <div>
      {state.tempSpots.tempSpots.data.map((t) => {
        return (
          <div key={t.name} className="container">
            <h3>{t.name}</h3>
            <div className="d-flex">
              <span className="me-2">Verification ends in:</span>
              <Countdown
                renderer={(p) => (
                  <div>
                    {p.hours < 10 && "0"}
                    {p.hours}:{p.minutes < 10 && "0"}
                    {p.minutes}:{p.seconds < 10 && "0"}
                    {p.seconds}
                  </div>
                )}
                zeroPadDays={0}
                date={
                  Date.now() +
                  t.verificationProcess!.endDate!.getTime() -
                  Date.now()
                }
              >
                <p>The verification has ended</p>
              </Countdown>
            </div>
            <div className="d-flex">
              <Button variant="contained" color="success" className="me-2">
                <div>
                  <p>Legit</p>
                  <p>
                    {t.verificationProcess?.votes?.reduce(
                      (prev, curr) => prev + Number(curr.isReal),
                      0
                    )}
                  </p>
                </div>
              </Button>
              <Button variant="contained" color="warning">
                <div>
                  <p>Fake</p>
                  <p>
                    {t.verificationProcess?.votes?.reduce(
                      (prev, curr) => prev + Number(!curr.isReal),
                      0
                    )}
                  </p>
                </div>
              </Button>
            </div>
            {t.images && t.images.length ? (
              <ImageGallery
                showThumbnails={false}
                items={t.images!.map((i) => ({
                  original: i.base64 as string,
                  originalWidth: 800,
                  originalHeight: 600,
                }))}
              />
            ) : (
              <div>No images were added for this temp spot.</div>
            )}
            <div className="d-flex">
              <p>Surf {t.surfaceScore} / 10</p>
              <p>
                {t.obstacles?.map((o) => (
                  <span key={v4()}>{o}</span>
                ))}
              </p>
              <p>Details</p>
              <p>Added by: {t.author?.userName}</p>
            </div>
          </div>
        );
      })}
      {state.tempSpots.loading && <CircularProgress color="secondary" />}
    </div>
  );
};

export default TempSpots;
