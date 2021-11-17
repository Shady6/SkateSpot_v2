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
            {createCommentComponent({
              listItemId: spotVideo.id,
              comments: spotVideo.comments as CommentDto[],
              listViewType: ListViewTypes.SPOT_VIDEOS,
            })}
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
