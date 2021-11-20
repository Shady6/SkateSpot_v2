import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deleteCommentThunkCreator } from "../../../state/actions/thunk_creators/deleteCommentThunkCreator";
import { editCommentThunkCreator } from "../../../state/actions/thunk_creators/editCommentThunkCreator";
import { useDispatch } from "react-redux";
import { CommentDto } from "../../../skate_spot_api/client";

interface Props {
  deleteCommentAction: ReturnType<typeof deleteCommentThunkCreator>;
  editCommentAction: ReturnType<typeof editCommentThunkCreator>;
  comment: CommentDto;
  listItemId: string;
  setIsEditingComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommentActions: React.FC<Props> = (p) => {
  const [isCommentActionsTooltipOpen, setIsCommentActionsTooltipOpen] =
    useState(false);
  const dispatch = useDispatch();

  return (
    <ClickAwayListener
      onClickAway={() => setIsCommentActionsTooltipOpen(false)}
    >
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={() => setIsCommentActionsTooltipOpen(false)}
          open={isCommentActionsTooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <div>
              <IconButton
                onClick={() => {
                  setIsCommentActionsTooltipOpen(false);
                  p.setIsEditingComment(true);
                }}
                className="p-1 me-2"
              >
                <EditIcon style={{ cursor: "pointer", fontSize: "1.1rem" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch(
                    p.deleteCommentAction({
                      listItemId: p.listItemId,
                      commentId: p.comment.id,
                    })
                  );
                  setIsCommentActionsTooltipOpen(false);
                }}
                className="p-1"
              >
                <DeleteIcon style={{ cursor: "pointer", fontSize: "1.1rem" }} />
              </IconButton>
            </div>
          }
        >
          <IconButton
            onClick={() => {
              setIsCommentActionsTooltipOpen(!isCommentActionsTooltipOpen);
            }}
            className="ms-1 p-0"
          >
            <MoreVertIcon
              style={{
                color: "#d2d2d2",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
