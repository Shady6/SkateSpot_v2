import React from "react";
import { useLikes } from "../../../hooks/useLikes";
import { LikeDto } from "../../../skate_spot_api/client";
import { likeComment } from "../../../state/actions/tempSpotActions";
import LikeIconBtn from "../like/LikeIconBtn";

interface Props {
  commentId: string;
  likes: LikeDto[];
  tempSpotId: string;
}

const CommentLikes: React.FC<Props> = ({ commentId, likes, tempSpotId }) => {
  const likeButtonsProps = useLikes({
    subjectId: commentId,
    likes:
      likes.length === 0
        ? []
        : likes.map((l) => ({
            isPositive: l.positive as boolean,
            userId: l.userId as string,
          })),
    likeAction: (subjectId, isPositive, deletedLike) =>
      likeComment({
        isPositive,
        deletedLike,
        subjectId,
        parentId: tempSpotId,
      }),
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
