import { Box, Modal } from "@material-ui/core";
import React from "react";
import {
  ITempSpotWithVerificationDto,
  AddressDto,
} from "../../../skate_spot_api/client";
import DisplaySpotMap from "../../map/DisplaySpotMap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  cursor: "default",
};

interface Props {
  tempSpot: ITempSpotWithVerificationDto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsModal: React.FC<Props> = ({ tempSpot, isOpen, setIsOpen }) => {
  const MyDisplaySpotMap = React.forwardRef((props, ref) => (
    <DisplaySpotMap address={tempSpot.address as AddressDto} />
  ));

  return (
    <Modal
      style={{ cursor: "pointer" }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {/* @ts-ignore */}
      <Box sx={style}>
        <MyDisplaySpotMap />
      </Box>
    </Modal>
  );
};

export default DetailsModal;
