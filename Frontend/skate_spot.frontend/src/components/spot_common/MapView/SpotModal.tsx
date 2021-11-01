import { CircularProgress } from "@material-ui/core";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useDispatch } from "react-redux";
import useMeasure from "react-use-measure";
import { tempSpotToSpot } from "../../../functions/mapper/mappingProfile";
import { sendRequestWithFlashMsgOnError } from "../../../functions/request/sendRequestWithFlashMsgOnError";
import {
  CommentDto,
  LikeDto,
  ObstacleType,
  SpotDto,
  SpotMarkerDataDto,
  TempSpotWithVerificationDto,
} from "../../../skate_spot_api/client";
import { likeThunkCreator } from "../../../state/actions/genericListViewActions";
import {
  spotComment,
  spotLike,
  spotLikeComment,
} from "../../../state/actions/spotAcionts";
import {
  tempSpotComment,
  tempSpotLikeComment,
} from "../../../state/actions/tempSpotActions";
import { spotActions } from "../../../state/reducers/spotReducer";
import { tempSpotActions } from "../../../state/reducers/tempSpotsReducer";
import { useRootState } from "../../../state/store";
import CommentBtn from "../../social/comment/CommentBtn";
import Comments from "../../social/comment/Comments";
import { MainLikeButtons } from "../../social/comment/MainLikeButtons";
import { vote_like_adapter } from "../../temp_spot/main/TempSpot";
import { Obstacles } from "../Obstacles";
import { SpotImages } from "../SpotImages";
import { SurfaceScore } from "../SurfaceScore";
import "./style.scss";

interface Props {
  markerData: SpotMarkerDataDto;
  setSelectedSpot: React.Dispatch<
    React.SetStateAction<SpotMarkerDataDto | null>
  >;
}

export const SpotModal = (p: Props) => {
  const dispatch = useDispatch();
  const auth = useRootState().auth;
  const spotState = useRootState().spotsState;
  const tempSpotState = useRootState().tempSpotsState;
  const [spot, setSpot] = useState<SpotDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalBoundsRef, modalBounds] = useMeasure();
  const modalRef = useRef<null | HTMLDivElement>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  useMapEvents({
    click(e) {
      // @ts-ignore
      if (e.originalEvent.path.some((p) => p.id === "spot-preview-modal"))
        return;
      p.setSelectedSpot(null);
    },
  });

  useEffect(() => {
    if (modalRef.current) modalBoundsRef(modalRef.current);
  }, [modalRef]);

  useEffect(() => {
    if (!modalRef.current) return;
    L.DomEvent.disableScrollPropagation(modalRef.current);
  }, [modalRef]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = p.markerData.isTempSpot
        ? await sendRequestWithFlashMsgOnError(
            dispatch,
            auth.content,
            (c) => c.get_Temp_Spot(p.markerData.id),
            "Couldn't load the temp spot, please try again later."
          )
        : await sendRequestWithFlashMsgOnError(
            dispatch,
            auth.content,
            (c) => c.get_Spot(p.markerData.id),
            "Couldn't load the spot, please try again later."
          );

      setLoading(false);
      if (res.content) {
        setSpot(
          p.markerData.isTempSpot
            ? tempSpotToSpot(res.content as TempSpotWithVerificationDto)
            : (res.content as SpotDto)
        );
        p.markerData.isTempSpot
          ? dispatch(
              tempSpotActions.setTempSpots([
                res.content as TempSpotWithVerificationDto,
              ])
            )
          : dispatch(spotActions.setSpots([res.content as SpotDto]));
      }
    })();

    return () => {
      dispatch(tempSpotActions.reset());
      dispatch(spotActions.reset());
    };
  }, [p.markerData]);

  useEffect(() => {
    if (
      tempSpotState.listWithCount.data.length === 1 &&
      p.markerData.isTempSpot
    )
      setSpot(tempSpotToSpot(tempSpotState.listWithCount.data[0]));
    else if (
      spotState.listWithCount.data.length === 1 &&
      !p.markerData.isTempSpot
    )
      setSpot(spotState.listWithCount.data[0]);
  }, [tempSpotState.listWithCount.data, spotState.listWithCount.data]);

  return (
    <div
      className="d-flex w-100 h-100 justify-content-end"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <div
        ref={modalRef}
        id="spot-preview-modal"
        className="col-12 col-md-5 col-lg-4 d-flex flex-column"
      >
        {loading && (
          <CircularProgress
            size={72}
            className="align-self-center"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        )}
        {spot && !loading && (
          <div>
            {spot!.images!.length !== 0 && (
              <div style={{ backgroundColor: "black" }}>
                <SpotImages
                  images={spot.images}
                  height={300}
                  width={modalBounds.width}
                />
              </div>
            )}
            <div className="ms-3">
              <h4 className="mt-2">{spot.name}</h4>
              <p>{spot.description}</p>
              <div className="d-flex mb-2">
                <SurfaceScore surfaceScore={spot.surfaceScore as number} />
                <Obstacles obstacles={spot.obstacles as ObstacleType[]} />
              </div>

              <div className="d-flex">
                <MainLikeButtons
                  likes={spot.likes as LikeDto[]}
                  listItemId={spot.id}
                  likeAction={
                    p.markerData.isTempSpot
                      ? (vote_like_adapter as unknown as ReturnType<
                          typeof likeThunkCreator
                        >)
                      : spotLike
                  }
                />
                <CommentBtn
                  onClick={() => setCommentsOpen(!commentsOpen)}
                  commentsCount={spot.comments?.length}
                />
              </div>

              {commentsOpen && (
                <Comments
                  listItemId={spot.id as string}
                  comments={spot.comments as CommentDto[]}
                  commentAction={
                    p.markerData.isTempSpot ? tempSpotComment : spotComment
                  }
                  likeAction={
                    p.markerData.isTempSpot
                      ? tempSpotLikeComment
                      : spotLikeComment
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
