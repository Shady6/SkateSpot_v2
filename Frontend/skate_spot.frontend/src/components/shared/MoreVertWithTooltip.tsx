import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";

interface Props {
  isTooltipOpen: boolean;
  setIsTooltipOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoreVertWithTooltip: React.FC<Props> = ({
  isTooltipOpen,
  setIsTooltipOpen,
  children,
}) => {
  return (
    <ClickAwayListener onClickAway={() => setIsTooltipOpen(false)}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={() => setIsTooltipOpen(false)}
          open={isTooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<>{children}</>}
        >
          <IconButton
            onClick={() => {
              setIsTooltipOpen(!isTooltipOpen);
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
