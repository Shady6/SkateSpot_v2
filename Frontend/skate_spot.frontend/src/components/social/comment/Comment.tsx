import React from "react";
import { CommentDto } from "../../../skate_spot_api/client";
import CommentLikes from "./CommentLikes";

interface Props {
  comment: CommentDto;
  tempSpotId: string;
}

const Comment: React.FC<Props> = ({ comment, tempSpotId }) => {
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
        tempSpotId={tempSpotId}
        commentId={comment.id as string}
        likes={comment.likes || []}
      />
    </div>
  );
};

export default Comment;
