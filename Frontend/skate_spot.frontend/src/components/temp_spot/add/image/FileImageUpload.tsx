import { ChangeEvent, useRef, useState } from "react";
import Upload from "../../../shared/Upload";
import { renderImageWithSizeInfo } from "../../../../functions/util/renderImageWithSizeInfo";

interface Props {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  imagesLimit: number;
  otherImagesCount: number;
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
  otherImagesCount,
}) => {
  const [uploadedImagesCount, setUploadedImagesCount] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imagesToTakeMax = imagesLimit - otherImagesCount;
    const uploadedFilesCount = e.target.files?.length ?? 0;
    let loadedImages: string[] = [];
    let imagesProcessed = 0;

    Array.from(e.target.files || []).forEach((f, i) => {
      if (i + 1 > imagesToTakeMax) return;

      const fr = new FileReader();
      fr.addEventListener("load", (e) => {
        loadedImages.push(e!.target!.result as string);
        imagesProcessed++;
      });
      fr.addEventListener("error", () => imagesProcessed++);
      fr.addEventListener("abort", () => imagesProcessed++);

      fr.readAsDataURL(f);
    });

    const interval = setInterval(() => {
      if (
        imagesProcessed === uploadedFilesCount ||
        (uploadedFilesCount > imagesToTakeMax &&
          imagesProcessed === imagesToTakeMax)
      ) {
        setUploadedImagesCount(uploadedFilesCount);
        setImages(loadedImages);
        clearInterval(interval);
      }
    }, 100);

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
      setUploadedCount={setUploadedImagesCount}
      renderItem={renderImageWithSizeInfo}
      otherUploadedItemsCount={otherImagesCount}
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
