import React, { useState } from "react";
import { createCommentComponent } from "../../../functions/component_creators/commentsCreator";
import {
  CommentDto,
  LikeDto,
  SmallUserDto,
  SpotVideoDto,
  VideoPlatformType,
} from "../../../skate_spot_api/client";
import { spotVideoLike } from "../../../state/actions/spotVideoActions";
import { ListViewTypes } from "../../../state/generic/listViewGenerics";
import CommentBtn from "../../social/comment/CommentBtn";
import { MainLikeButtons } from "../../social/comment/MainLikeButtons";
import { MapModal } from "../../spot_common/MapView/MapModal";
import { ShowMapModalBtn } from "../../spot_common/MapView/ShowMapModalBtn";
import { SpotAuthor as SpotVideoAuthor } from "../../spot_common/SpotAuthor";
import { SpotNameLink } from "../../spot_common/SpotNameLink";
import { InstagramVideo } from "../InstagramVideo";
import { YouTubeVideo } from "../YouTubeVideo";
import { ListItemHeader } from "../../spot_common/ListItemHeader";

interface Props {
  spotVideo: SpotVideoDto;
}

export const SpotVideo = React.memo(
  ({ spotVideo }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);

    return (
      <div className="mb-4">
        <ListItemHeader
          authorId={spotVideo.author.id}
          listItemId={spotVideo.id}
          listViewType={ListViewTypes.SPOT_VIDEOS}
          deleteFunc={(c, t) => c.delete_Spot_Video(spotVideo.id, t)}
        >
          {spotVideo.spot ? (
            <SpotNameLink spotName={spotVideo?.spot?.name as string} />
          ) : (
            <h4 style={{ color: "rgb(148,148,148)" }}>[Spot deleted]</h4>
          )}
        </ListItemHeader>
        {spotVideo.platformType === VideoPlatformType.Instagram ? (
          <InstagramVideo videoId={spotVideo.embedId as string} />
        ) : (
          <YouTubeVideo videoId={spotVideo.embedId as string} />
        )}
        <p>{spotVideo.description}</p>
        <div className="d-flex mt-2">
          <MainLikeButtons
            listItemId={spotVideo.id as string}
            likes={spotVideo.likes as LikeDto[]}
            likeAction={spotVideoLike}
          />
          <CommentBtn
            onClick={() => setCommentsOpen(!commentsOpen)}
            commentsCount={spotVideo?.comments?.length || 0}
          />
          <ShowMapModalBtn
            disabled={!spotVideo.spot}
            setIsMapModalOpen={setIsMapModalOpen}
          />
          <SpotVideoAuthor author={spotVideo.author as SmallUserDto} />
        </div>
        {commentsOpen && (
          <div className="row col-4">
            {createCommentComponent({
              listItemId: spotVideo.id,
              comments: spotVideo.comments as CommentDto[],
              listViewType: ListViewTypes.SPOT_VIDEOS,
            })}
          </div>
        )}
        <hr />
        {spotVideo.spot && (
          <MapModal
            isMapModalOpen={isMapModalOpen}
            setIsMapModalOpen={setIsMapModalOpen}
            address={spotVideo.spot.address}
          />
        )}
      </div>
    );
  },
  (p, n) =>
    JSON.stringify({
      likes: p.spotVideo.likes,
      comments: p.spotVideo.comments,
    }) ===
    JSON.stringify({ likes: n.spotVideo.likes, comments: n.spotVideo.comments })
);
