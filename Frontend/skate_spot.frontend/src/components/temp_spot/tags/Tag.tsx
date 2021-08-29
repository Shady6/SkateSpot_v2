import { Button } from "@material-ui/core";
import React from "react";

interface Props {
  name: string;
  isSelected: boolean;
  toggleSelection: () => void;
}

const Tag: React.FC<Props> = ({ name, isSelected, toggleSelection }) => {
  return (
    <Button
      style={isSelected ? { backgroundColor: "#9df990" } : undefined}
      className="me-1"
      onClick={toggleSelection}
      variant={isSelected ? "contained" : "text"}
    >
      {name}
    </Button>
  );
};

export default Tag;
