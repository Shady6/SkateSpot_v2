import { ChangeEvent, useRef, useState } from "react";
import { take } from "../../../functions/take";
import Upload from "../../shared/Upload";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  otherImagesCount: number;
  imagesLimit: number;
}

export const acceptedFileFormats = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

const FileImageUpload: React.FC<Props> = ({
  files,
  setFiles,
  otherImagesCount,
  imagesLimit,
}) => {
  const [uploadedImagesCount, setImagesUploadedCount] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileImagesToTake = imagesLimit - otherImagesCount;
    setFiles(take(Array.from(e.target.files ?? []), fileImagesToTake));

    setImagesUploadedCount(e.target.files?.length ?? 0);
    //@ts-ignore
    e.target.value = null;
  };

  return (
    <Upload
      uploadedItems={files}
      setUploadedItems={setFiles}
      otherUploadedItemsCount={otherImagesCount}
      uploadLimit={imagesLimit}
      uploadedItemPluralized={"images"}
      onUploadBtnClick={() => fileInput.current?.click()}
      uploadedCount={uploadedImagesCount}
      setUploadedCount={setImagesUploadedCount}
      renderItem={(file: File) => (
        <span>
          {file.name} - {Math.round((file.size / 1024 / 1024) * 100) / 100}
          MBs
        </span>
      )}
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
