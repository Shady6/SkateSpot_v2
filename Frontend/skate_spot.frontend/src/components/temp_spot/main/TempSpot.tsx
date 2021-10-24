import React, { useState } from "react";
import {
  AddressDto,
  ObstacleType,
  SmallUserDto,
  TempSpotWithVerificationDto,
} from "../../../skate_spot_api/client";
import { likeThunkCreator } from "../../../state/actions/genericListViewActions";
import {
  tempSpotComment,
  tempSpotLikeComment,
  vote,
} from "../../../state/actions/tempSpotActions";
import CommentBtn from "../../social/comment/CommentBtn";
import Comments from "../../social/comment/Comments";
import { MainLikeButtons } from "../../social/comment/MainLikeButtons";
import MapModal from "../../spot_common/MapModal";
import { Obstacles } from "../../spot_common/Obstacles";
import { ShowOnMapBtn } from "../../spot_common/ShowOnMapBtn";
import { SpotAuthor } from "../../spot_common/SpotAuthor";
import { SpotImages } from "../../spot_common/SpotImages";
import { SurfaceScore } from "../../spot_common/SurfaceScore";

interface Props {
  tempSpot: TempSpotWithVerificationDto;
}

export const TempSpot = React.memo(
  ({ tempSpot }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);

    const vote_like_adapter = ({
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
          <SurfaceScore surfaceScore={tempSpot.surfaceScore as number} />
          <Obstacles obstacles={tempSpot.obstacles as ObstacleType[]} />
          <ShowOnMapBtn onClick={() => setIsMapModalOpen(true)} />
          <SpotAuthor author={tempSpot.author as SmallUserDto} />
        </div>
        {commentsOpen && (
          <Comments
            listItemId={tempSpot.id as string}
            comments={tempSpot.verificationProcess?.discussion}
            commentAction={tempSpotComment}
            likeAction={tempSpotLikeComment}
          />
        )}
        <hr />
        <MapModal
          address={tempSpot.address as AddressDto}
          isOpen={isMapModalOpen}
          setIsOpen={setIsMapModalOpen}
        />
      </div>
    );
  },
  (p, n) =>
    JSON.stringify(p.tempSpot.verificationProcess) ===
    JSON.stringify(n.tempSpot.verificationProcess)
);
