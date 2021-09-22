import React from "react";
import FileImageUpload from "./FileImageUpload";
import LinkImageUpload from "./LinkImageUpload";

interface Props {
  fromLinkImages: string[];
  setFromLinkImages: React.Dispatch<React.SetStateAction<string[]>>;
  fromFileImages: string[];
  setFromFileImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUpload: React.FC<Props> = ({
  fromLinkImages,
  setFromLinkImages,
  fromFileImages,
  setFromFileImages,
}) => {
  const imagesLimit = 10;

  return (
    <>
      <p>You can add up to {imagesLimit} images of spot as images or links</p>
      {fromLinkImages.length + fromFileImages.length >= imagesLimit && (
        <p className="text-info text-sm">
          You've reached the images upload limit
        </p>
      )}
      <div className={"mt-4 mb-3"}>
        <FileImageUpload
          images={fromFileImages}
          setImages={setFromFileImages}
          imagesLimit={imagesLimit}
          otherImagesCount={fromLinkImages.length}
        />
      </div>
      <div>
        <LinkImageUpload
          images={fromLinkImages}
          setImages={setFromLinkImages}
          imagesLimit={imagesLimit}
          otherImagesCount={fromFileImages.length}
        />
      </div>
    </>
  );
};

export default ImageUpload;
