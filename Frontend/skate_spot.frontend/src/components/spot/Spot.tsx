import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCommentComponent } from "../../functions/component_creators/commentsCreator";
import { goToSpotDetailPage } from "../../functions/route/goToSpotDetailPage";
import {
  CommentDto,
  LikeDto,
  ObstacleType,
  SmallUserDto,
  SpotDto,
} from "../../skate_spot_api/client";
import { spotLike } from "../../state/actions/spotAcionts";
import { ListViewTypes } from "../../state/generic/listViewGenerics";
import CommentBtn from "../social/comment/CommentBtn";
import { MainLikeButtons } from "../social/comment/MainLikeButtons";
import { MapModal } from "../spot_common/MapView/MapModal";
import { ShowMapModalBtn } from "../spot_common/MapView/ShowMapModalBtn";
import { Obstacles } from "../spot_common/Obstacles";
import { SpotAuthor } from "../spot_common/SpotAuthor";
import { SpotImages } from "../spot_common/SpotImages";
import { SurfaceScore } from "../spot_common/SurfaceScore";
import { SpotVideoBtn } from "../spot_video/SpotVideoBtn";
import { SpotNameLink } from "../spot_common/SpotNameLink";
import { ListItemHeader } from "../spot_common/ListItemHeader";

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
        <ListItemHeader
          authorId={spot.author.id}
          listItemId={spot.id}
          listViewType={ListViewTypes.SPOTS}
          deleteFunc={(c, t) => c.delete_Spot(spot.id, t)}
        >
          <SpotNameLink spotName={spot.name as string} />
        </ListItemHeader>

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
            {createCommentComponent({
              listItemId: spot.id,
              comments: spot.comments as CommentDto[],
              listViewType: ListViewTypes.SPOTS,
            })}
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
