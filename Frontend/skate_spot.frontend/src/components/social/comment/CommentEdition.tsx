import { TextField } from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { useInputState } from "../../../hooks/util/useInputState";
import { CommentDto } from "../../../skate_spot_api/client";
import { editCommentThunkCreator } from "../../../state/actions/thunk_creators/editCommentThunkCreator";
import { useDispatch } from "react-redux";

interface Props {
  comment: CommentDto;
  listItemId: string;
  editCommentAction: ReturnType<typeof editCommentThunkCreator>;
  setIsEditingComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommentEdition: React.FC<Props> = (p) => {
  const [newComment, setNewComment] = useInputState(p.comment.text as string);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="d-flex align-items-end mb-3">
        <TextField
          color="primary"
          className="me-2 flex-grow-1"
          variant="standard"
          multiline
          maxRows={4}
          value={newComment}
          onChange={setNewComment}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
        />
        <CheckIcon
          className="me-2"
          style={{ cursor: "pointer" }}
          color={newComment ? "inherit" : "disabled"}
          onClick={() => {
            p.setIsEditingComment(false);
            if (newComment !== p.comment.text)
              dispatch(
                p.editCommentAction({
                  listItemId: p.listItemId,
                  commentId: p.comment.id,
                  newText: newComment,
                })
              );
          }}
        />
        <ClearIcon
          onClick={() => {
            p.setIsEditingComment(false);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
