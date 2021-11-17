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
import { InstagramVideo } from "../InstagramVideo";
import { YouTubeVideo } from "../YouTubeVideo";

interface Props {
  spotVideo: SpotVideoDto;
}

export const SpotVideo = React.memo(
  ({ spotVideo }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);

    return (
      <div className="mb-4">
        <h4>{spotVideo?.spot?.name}</h4>
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
          <ShowMapModalBtn setIsMapModalOpen={setIsMapModalOpen} />
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
        <MapModal
          isMapModalOpen={isMapModalOpen}
          setIsMapModalOpen={setIsMapModalOpen}
          address={spotVideo.spot.address}
        />
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
