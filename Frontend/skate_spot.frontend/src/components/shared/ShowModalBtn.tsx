import { Button } from "@material-ui/core";
import React from "react";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowModalBtn: React.FC<Props> = ({ setIsOpen, children }) => {
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} size="small" variant="outlined">
        {children}
      </Button>
    </div>
  );
};
