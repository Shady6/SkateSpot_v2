import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import { ShowModalBtn } from "../../shared/ShowModalBtn";

interface Props {
  setIsMapModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowMapModalBtn: React.FC<Props> = (p) => {
  return (
    <ShowModalBtn setIsOpen={p.setIsMapModalOpen}>
      <RoomIcon />
    </ShowModalBtn>
  );
};
