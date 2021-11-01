import { Box, Modal } from "@material-ui/core";
import React from "react";
import { AddressDto } from "../../skate_spot_api/client";
import DisplaySingleSpot from "../map/DisplaySingleSpotMap";

export const ModalStyle = {
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
  address: AddressDto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapModal: React.FC<Props> = ({ address, isOpen, setIsOpen }) => {
  const MyDisplaySpotMap = React.forwardRef(() => (
    <DisplaySingleSpot address={address} />
  ));

  return (
    <Modal
      style={{ cursor: "pointer" }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {/* @ts-ignore */}
      <Box sx={ModalStyle}>
        <MyDisplaySpotMap />
      </Box>
    </Modal>
  );
};

export default MapModal;
