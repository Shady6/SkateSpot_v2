import { ChangeEvent, useRef, useState } from "react";
import { renderImageWithSizeInfo } from "../../../functions/renderImageWithSizeInfo";
import Upload from "../../shared/Upload";

interface Props {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  imagesLimit: number;
}

export const acceptedFileFormats = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

const FileImageUpload: React.FC<Props> = ({
  images,
  setImages,
  imagesLimit,
}) => {
  const [uploadedImagesCount, setImagesUploadedCount] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileImagesToTake = imagesLimit - images.length;

    Array.from(e.target.files || []).forEach((f, i) => {
      const fr = new FileReader();
      if (i + 1 > fileImagesToTake) return;

      fr.addEventListener("load", (e) => {
        setImages([...images, e!.target!.result as string]);
      });

      fr.readAsDataURL(f);
    });

    setImagesUploadedCount(e.target.files?.length ?? 0);
    //@ts-ignore
    e.target.value = null;
  };

  return (
    <Upload
      uploadedItems={images}
      setUploadedItems={setImages}
      uploadLimit={imagesLimit}
      uploadedItemPluralized={"images"}
      onUploadBtnClick={() => fileInput.current?.click()}
      uploadedCount={uploadedImagesCount}
      setUploadedCount={setImagesUploadedCount}
      renderItem={renderImageWithSizeInfo}
    >
      <input
        ref={fileInput}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        type="file"
        accept={acceptedFileFormats.join(", ")}
        multiple={true}
      />
    </Upload>
  );
};

export default FileImageUpload;
