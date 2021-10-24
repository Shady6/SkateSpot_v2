import React from "react";
import { CommentDto } from "../../../skate_spot_api/client";
import { likeThunkCreator } from "../../../state/actions/genericListViewActions";
import CommentLikes from "./CommentLikes";

interface Props {
  comment: CommentDto;
  tempSpotId: string;
  likeAction: ReturnType<typeof likeThunkCreator>;
}

const Comment: React.FC<Props> = ({ comment, tempSpotId, likeAction }) => {
  return (
    <div className="mb-3">
      <p className="mb-0">
        <b className="me-1">{comment.author?.userName}</b>
        <span style={{ color: "#8d8d8d", fontSize: "0.8rem" }}>
          {new Date(comment.createdAt as unknown as string).toDateString()}
        </span>
      </p>
      <p className="mb-1">{comment.text}</p>
      <CommentLikes
        likeAction={likeAction}
        listItemId={tempSpotId}
        commentId={comment.id as string}
        likes={comment.likes || []}
      />
    </div>
  );
};

export default Comment;
