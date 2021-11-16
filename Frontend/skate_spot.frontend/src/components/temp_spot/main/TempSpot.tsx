import React, { useState } from "react";
import {
  ObstacleType,
  SmallUserDto,
  TempSpotWithVerificationDto,
} from "../../../skate_spot_api/client";
import {
  tempSpotComment,
  tempSpotLikeComment,
  vote,
} from "../../../state/actions/tempSpotActions";
import { likeThunkCreator } from "../../../state/actions/thunk_creators/likeThunkCreator";
import CommentBtn from "../../social/comment/CommentBtn";
import Comments from "../../social/comment/Comments";
import { MainLikeButtons } from "../../social/comment/MainLikeButtons";
import { MapModal } from "../../spot_common/MapView/MapModal";
import { ShowMapModalBtn } from "../../spot_common/MapView/ShowMapModalBtn";
import { Obstacles } from "../../spot_common/Obstacles";
import { SpotAuthor } from "../../spot_common/SpotAuthor";
import { SpotImages } from "../../spot_common/SpotImages";
import { SurfaceScore } from "../../spot_common/SurfaceScore";

interface Props {
  tempSpot: TempSpotWithVerificationDto;
}

export const vote_like_adapter = ({
  isPositive,
  deletedLike,
  subjectId,
}: {
  isPositive: boolean;
  deletedLike: boolean;
  subjectId: string;
}) => {
  return vote({
    tempSpotId: subjectId,
    isReal: isPositive,
    deletedVote: deletedLike,
  });
};

export const TempSpot = React.memo(
  ({ tempSpot }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);

    return (
      <div className="mb-4">
        <h4>{tempSpot.name}</h4>
        <p>{tempSpot.description}</p>
        <SpotImages images={tempSpot.images} />
        <div className="d-flex mt-2">
          <MainLikeButtons
            listItemId={tempSpot.id as string}
            likes={tempSpot!.verificationProcess!.votes!.map((v) => ({
              userId: v.voterId,
              positive: v.isReal,
            }))}
            likeAction={
              vote_like_adapter as unknown as ReturnType<
                typeof likeThunkCreator
              >
            }
          />
          <CommentBtn
            onClick={() => setCommentsOpen(!commentsOpen)}
            commentsCount={tempSpot.verificationProcess?.discussion?.length}
          />
          <ShowMapModalBtn setIsMapModalOpen={setIsMapModalOpen} />
          <div className="ms-3 d-flex">
            <SurfaceScore surfaceScore={tempSpot.surfaceScore as number} />
            <Obstacles obstacles={tempSpot.obstacles as ObstacleType[]} />
          </div>
          <SpotAuthor author={tempSpot.author as SmallUserDto} />
        </div>
        {commentsOpen && (
          <div className="row col-4">
            <Comments
              listItemId={tempSpot.id as string}
              comments={tempSpot.verificationProcess?.discussion}
              commentAction={tempSpotComment}
              likeAction={tempSpotLikeComment}
            />
          </div>
        )}
        <hr />
        <MapModal
          isMapModalOpen={isMapModalOpen}
          setIsMapModalOpen={setIsMapModalOpen}
          address={tempSpot.address}
        />
      </div>
    );
  },
  (p, n) =>
    JSON.stringify(p.tempSpot.verificationProcess) ===
    JSON.stringify(n.tempSpot.verificationProcess)
);
