import { TextField } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { useInputState } from "../../../hooks/useInputState";
import { CommentDto } from "../../../skate_spot_api/client";
import { comment as commentAction } from "../../../state/actions/tempSpotActions";
import Comment from "./Comment";

interface Props {
  comments?: CommentDto[];
  tempSpotId: string;
}

const Comments: React.FC<Props> = ({ comments, tempSpotId }) => {
  const [comment, setComment, resetCommentInput] = useInputState("");
  const dispatch = useDispatch();

  const sendComment = () => {
    if (!comment) return;
    dispatch(commentAction({ listItemId: tempSpotId, text: comment }));
    resetCommentInput();
  };

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
        <Comment key={v4()} tempSpotId={tempSpotId} comment={c} />
      ))}
    </div>
  );
};

export default Comments;
