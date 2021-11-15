import React, { useState } from "react";
import {
  LikeDto,
  ObstacleType,
  SmallUserDto,
  SpotDto,
} from "../../../skate_spot_api/client";
import {
  spotComment,
  spotLike,
  spotLikeComment,
} from "../../../state/actions/spotAcionts";
import CommentBtn from "../../social/comment/CommentBtn";
import Comments from "../../social/comment/Comments";
import { MainLikeButtons } from "../../social/comment/MainLikeButtons";
import { MapModal } from "../../spot_common/MapView/MapModal";
import { ShowMapModalBtn } from "../../spot_common/MapView/ShowMapModalBtn";
import { Obstacles } from "../../spot_common/Obstacles";
import { SpotAuthor } from "../../spot_common/SpotAuthor";
import { SpotImages } from "../../spot_common/SpotImages";
import { SurfaceScore } from "../../spot_common/SurfaceScore";
import { AddSpotVideoModal } from "../../spot_video/AddSpotVideoModal";
import { AddVideoBtn } from "../../spot_video/AddVideoBtn";

interface Props {
  spot: SpotDto;
}

export const SpotDetails = React.memo(
  ({ spot }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [isAddSpotVideoModalOpen, setIsAddSpotVideoModalOpen] =
      useState(false);

    return (
      <div className="mb-4">
        <h4>{spot.name}</h4>
        <p>{spot.description}</p>
        <SpotImages images={spot.images} />
        <div className="d-flex mt-2">
          <MainLikeButtons
            listItemId={spot.id as string}
            likes={spot.likes as LikeDto[]}
            likeAction={spotLike}
          />
          <CommentBtn
            onClick={() => setCommentsOpen(!commentsOpen)}
            commentsCount={spot?.comments?.length || 0}
          />
          <AddVideoBtn
            setIsAddSpotVideoModalOpen={setIsAddSpotVideoModalOpen}
          />
          <ShowMapModalBtn setIsMapModalOpen={setIsMapModalOpen} />
          <div className="ms-3 d-flex">
            <SurfaceScore surfaceScore={spot.surfaceScore as number} />
            <Obstacles obstacles={spot.obstacles as ObstacleType[]} />
          </div>
          <SpotAuthor author={spot.author as SmallUserDto} />
        </div>
        {commentsOpen && (
          <div className="row col-4">
            <Comments
              listItemId={spot.id as string}
              comments={spot.comments}
              commentAction={spotComment}
              likeAction={spotLikeComment}
            />
          </div>
        )}
        <hr />
        <MapModal
          isMapModalOpen={isMapModalOpen}
          setIsMapModalOpen={setIsMapModalOpen}
          address={spot.address}
        />
        <AddSpotVideoModal
          isOpen={isAddSpotVideoModalOpen}
          setIsOpen={setIsAddSpotVideoModalOpen}
          spotName={spot.name as string}
        />
      </div>
    );
  },
  (p, n) =>
    JSON.stringify({ likes: p.spot.likes, comments: p.spot.comments }) ===
    JSON.stringify({ likes: n.spot.likes, comments: n.spot.comments })
);
