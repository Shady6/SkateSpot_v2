import { TextField } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { v4 } from "uuid";
import { useComment } from "../../../hooks/useComment";
import { CommentDto } from "../../../skate_spot_api/client";
import {
  commentThunkCreator,
  likeThunkCreator,
} from "../../../state/actions/genericListViewActions";
import Comment from "./Comment";

interface Props {
  comments?: CommentDto[];
  listItemId: string;
  commentAction: ReturnType<typeof commentThunkCreator>;
  likeAction: ReturnType<typeof likeThunkCreator>;
}

const Comments: React.FC<Props> = ({
  comments,
  listItemId,
  commentAction,
  likeAction,
}) => {
  const { comment, setComment, sendComment } = useComment(
    listItemId,
    commentAction
  );

  return (
    <div className="mt-4 row col-4">
      <div className="d-flex align-items-end mb-3">
        <TextField
          className="me-2 flex-grow-1"
          variant="standard"
          label="Write something"
          multiline
          maxRows={4}
          value={comment}
          onChange={setComment}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendComment();
          }}
        />
        <SendIcon
          onClick={sendComment}
          style={{ cursor: "pointer" }}
          color={comment ? "inherit" : "disabled"}
        />
      </div>

      {comments?.map((c) => (
        <Comment
          key={v4()}
          tempSpotId={listItemId}
          comment={c}
          likeAction={likeAction}
        />
      ))}
    </div>
  );
};

export default Comments;
