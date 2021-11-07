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
import { SpotAuthor as SpotVideoAuthor } from "../../spot_common/SpotAuthor";
import { InstagramVideo } from "../InstagramVideo";
import { YouTubeVideo } from "../YouTubeVideo";

interface Props {
  spotVideo: SpotVideoDto;
}

export const SpotVideo = React.memo(
  ({ spotVideo }: Props) => {
    const [commentsOpen, setCommentsOpen] = useState(false);

    return (
      <div className="mb-4">
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
