import React from "react";
import { Button } from "@material-ui/core";
import ChatIcon from "@mui/icons-material/Chat";

interface Props {
  commentsCount?: number;
  onClick: () => void;
}

const CommentBtn: React.FC<Props> = ({ commentsCount, onClick }) => {
  return (
    <div>
      <Button
        onClick={onClick}
        variant="outlined"
        size="small"
        className="me-1"
      >
        <ChatIcon className="me-1" />
        <span>{commentsCount || "0"}</span>
      </Button>
    </div>
  );
};

export default CommentBtn;
