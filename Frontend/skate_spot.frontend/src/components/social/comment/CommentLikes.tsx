import React from "react";
import { useLikes } from "../../../hooks/social/useLikes";
import { LikeDto } from "../../../skate_spot_api/client";
import { likeThunkCreator } from "../../../state/actions/thunk_creators/likeThunkCreator";

import LikeIconBtn from "../like/LikeIconBtn";

interface Props {
  commentId: string;
  likes: LikeDto[];
  listItemId: string;
  likeAction: ReturnType<typeof likeThunkCreator>;
}

const CommentLikes: React.FC<Props> = ({
  commentId,
  likes,
  listItemId,
  likeAction,
}) => {
  const likeButtonsProps = useLikes({
    subjectId: commentId,
    parentId: listItemId,
    likes: likes?.map((l) => ({
      positive: l.positive as boolean,
      userId: l.userId as string,
    })),
    likeAction,
  });

  return (
    <div className="d-flex">
      {likeButtonsProps.map((b) => (
        <LikeIconBtn key={b.isPositive.toString()} {...b} />
      ))}
    </div>
  );
};

export default CommentLikes;
