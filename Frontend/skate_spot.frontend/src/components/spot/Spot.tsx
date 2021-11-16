import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { goToSpotDetailPage } from "../../functions/route/goToSpotDetailPage";
import {
  LikeDto,
  ObstacleType,
  SmallUserDto,
  SpotDto,
} from "../../skate_spot_api/client";
import { spotLike } from "../../state/actions/spotAcionts";
import { getAllThunks } from "../../state/actions/thunk_creators/allThunks";
import { ListViewTypes } from "../../state/generic/listViewGenerics";
import CommentBtn from "../social/comment/CommentBtn";
import Comments from "../social/comment/Comments";
import { MainLikeButtons } from "../social/comment/MainLikeButtons";
import { MapModal } from "../spot_common/MapView/MapModal";
import { ShowMapModalBtn } from "../spot_common/MapView/ShowMapModalBtn";
import { Obstacles } from "../spot_common/Obstacles";
import { SpotAuthor } from "../spot_common/SpotAuthor";
import { SpotImages } from "../spot_common/SpotImages";
import { SurfaceScore } from "../spot_common/SurfaceScore";
import { SpotVideoBtn } from "../spot_video/SpotVideoBtn";
import { SpotNameLink } from "./SpotNameLink";

interface Props {
  spot: SpotDto;
}

export const Spot = React.memo(
  ({ spot }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const history = useHistory();

    return (
      <div className="mb-4">
        <SpotNameLink spotName={spot.name as string} />
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
          <SpotVideoBtn
            videosCount={spot.videosCount}
            onClick={() => goToSpotDetailPage({ history, spot })}
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
              commentAction={getAllThunks().spots.comment}
              likeAction={getAllThunks().spots.likeComment}
            />
          </div>
        )}
        <hr />
        <MapModal
          isMapModalOpen={isMapModalOpen}
          setIsMapModalOpen={setIsMapModalOpen}
          address={spot.address}
        />
      </div>
    );
  },
  (p, n) =>
    JSON.stringify({ likes: p.spot.likes, comments: p.spot.comments }) ===
    JSON.stringify({ likes: n.spot.likes, comments: n.spot.comments })
);
