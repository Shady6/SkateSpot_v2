import React from "react";
import { CommentDto } from "../../../skate_spot_api/client";

interface Props {
  comment: CommentDto;
}

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div>
      <p>
        <b>{comment.author?.userName}</b>
      </p>
      <p>{comment.text}</p>
      <div className="d-flex justify-content-between">
        <div></div>
        <span>
          {new Date(comment.createdAt as unknown as string).toDateString()}
        </span>
      </div>
    </div>
  );
};

export default Comment;
