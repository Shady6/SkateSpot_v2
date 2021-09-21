import React from "react";
import FileImageUpload from "./FileImageUpload";
import LinkImageUpload from "./LinkImageUpload";
import { LinkImage } from "./LinkImageUpload";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  links: LinkImage[];
  setLinks: React.Dispatch<React.SetStateAction<LinkImage[]>>;
}

const ImageUpload: React.FC<Props> = ({ files, setFiles, links, setLinks }) => {
  const imagesLimit = 10;

  return (
    <>
      <p>You can add up to {imagesLimit} images of spot as files or links</p>
      {files.length + links.length >= imagesLimit && (
        <p className="text-info text-sm">
          You've reached the images upload limit
        </p>
      )}
      <div className={"mt-4 mb-3"}>
        <FileImageUpload
          files={files}
          setFiles={setFiles}
          imagesLimit={imagesLimit}
          otherImagesCount={links.length}
        />
      </div>
      <div>
        <LinkImageUpload
          links={links}
          setLinks={setLinks}
          imagesLimit={imagesLimit}
          otherImagesCount={files.length}
        />
      </div>
    </>
  );
};

export default ImageUpload;
