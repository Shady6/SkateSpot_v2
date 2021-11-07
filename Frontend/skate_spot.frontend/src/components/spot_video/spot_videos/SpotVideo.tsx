import React, { useState } from "react";
import {
  LikeDto,
  SmallUserDto,
  SpotVideoDto,
  VideoPlatformType,
} from "../../../skate_spot_api/client";
import {
  spotVideoComment,
  spotVideoLike,
  spotVideoLikeComment,
} from "../../../state/actions/spotVideoActions";
import CommentBtn from "../../social/comment/CommentBtn";
import Comments from "../../social/comment/Comments";
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
            <Comments
              listItemId={spotVideo.id as string}
              comments={spotVideo.comments}
              commentAction={spotVideoComment}
              likeAction={spotVideoLikeComment}
            />
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
