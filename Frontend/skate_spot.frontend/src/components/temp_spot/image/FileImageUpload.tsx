import { ChangeEvent, useRef, useState } from "react";
import { take } from "../../../functions/take";
import Upload from "../../shared/Upload";
import { v4 } from "uuid";

export interface IdFile {
  uuid: string;
  item: File;
}

interface Props {
  files: IdFile[];
  setFiles: React.Dispatch<React.SetStateAction<IdFile[]>>;
  otherImagesCount: number;
  imagesLimit: number;
}

export const acceptedFileFormats = [
  "image/jpeg",
  "image/jpg",
  "image/png",
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
    setFiles(
      take(Array.from(e.target.files ?? []), fileImagesToTake).map((f) => ({
        uuid: v4(),
        item: f,
      }))
    );
    setImagesUploadedCount(e.target.files?.length ?? 0);
    //@ts-ignore
    e.target.value = null;
  };

  return (
    <Upload
      uploadedItems={files}
      // @ts-ignore
      setUploadedItems={setFiles}
      otherUploadedItemsCount={otherImagesCount}
      uploadLimit={imagesLimit}
      uploadedItemPluralized={"images"}
      onUploadBtnClick={() => fileInput.current?.click()}
      uploadedCount={uploadedImagesCount}
      setUploadedCount={setImagesUploadedCount}
      renderItem={(file) => <span>{file.item.name}</span>}
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
