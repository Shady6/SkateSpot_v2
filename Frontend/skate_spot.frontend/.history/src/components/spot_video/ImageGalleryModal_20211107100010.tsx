import React from "react";
import { ImageDto } from "../../skate_spot_api/client";
import { MyModal } from "../shared/MyModal";
import { SpotImages } from "../spot_common/SpotImages";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images?: ImageDto[];
}

export const ImageGalleryModal: React.FC<Props> = (p) => {
  return (
    <MyModal isOpen={p.isOpen} setIsOpen={p.setIsOpen}>
      <SpotImages images={p.images} />
    </MyModal>
  );
};
