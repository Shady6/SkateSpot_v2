import React from "react";
import { AddressDto } from "../../../skate_spot_api/client";
import { MyModal } from "../../shared/MyModal";
import DisplaySingleSpot from "../../map/DisplaySingleSpotMap";

interface Props {
  isMapModalOpen: boolean;
  setIsMapModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: AddressDto;
}

export const MapModal: React.FC<Props> = (p) => {
  return (
    <MyModal isOpen={p.isMapModalOpen} setIsOpen={p.setIsMapModalOpen}>
      <DisplaySingleSpot address={p.address} />
    </MyModal>
  );
};
