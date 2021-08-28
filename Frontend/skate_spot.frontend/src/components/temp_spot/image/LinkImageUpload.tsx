import { Button, Icon, IconButton, TextField } from "@material-ui/core";
import { useState } from "react";
import { v4 } from "uuid";
import { useError } from "../../../hooks/useError";
import { useInputState } from "../../../hooks/useInputState";
import Upload from "../../shared/Upload";
import { Uploaded } from "../../shared/Upload";

export interface IdLink {
  uuid: string;
  item: {
    name: string;
    url: string;
  };
}

interface Props {
  links: IdLink[];
  setLinks: React.Dispatch<React.SetStateAction<IdLink[]>>;
  otherImagesCount: number;
  imagesLimit: number;
}

const LinkImageUpload: React.FC<Props> = ({
  links,
  setLinks,
  otherImagesCount,
  imagesLimit,
}) => {
  const [uploadedImagesCount, setImagesUploadedCount] = useState(0);
  const [input, setInput, resetInput] = useInputState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const renderError = useError(() => error, [url, error]);

  const canUploadImage = () =>
    links.length + otherImagesCount < imagesLimit && input;

  const addImage = async () => {
    if (!canUploadImage()) return;

    setUrl(input);
    setError("");
    try {
      const url = new URL(input);
      let img = new Image();
      img.onload = () => {
        setLinks([
          ...links,
          {
            uuid: v4(),
            item: {
              name: "",
              url: input,
            },
          },
        ]);
        setImagesUploadedCount(links.length + 1);
        resetInput();
      };
      img.onerror = () => {
        setError(`Url contains invalid image - ${input}`);
      };
      img.src = url.toString();
    } catch {
      setError(`The url is not valid - ${input}`);
    }
  };

  const renderImage = (link: Uploaded) => {
    return (
      <img
        alt="Your uploaded spot img"
        style={{
          maxWidth: 100,
          maxHeight: 100,
          width: "auto",
          height: "auto",
        }}
        src={(link as unknown as IdLink).item.url}
      />
    );
  };

  return (
    <Upload
      uploadedItems={links}
      // @ts-ignore
      setUploadedItems={setLinks}
      otherUploadedItemsCount={otherImagesCount}
      uploadLimit={imagesLimit}
      uploadedItemPluralized={"images"}
      onUploadBtnClick={() => {}}
      uploadedCount={uploadedImagesCount}
      setUploadedCount={setImagesUploadedCount}
      showUploadButton={false}
      renderItem={renderImage}
    >
      <>
        <div className="mt-2 d-flex mb-1">
          <TextField
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") addImage();
            }}
            onChange={setInput}
            variant="standard"
            label="Url"
          />
          <IconButton
            onClick={addImage}
            disabled={!canUploadImage()}
            className="align-self-end ms-2"
          >
            <Icon className="fa fa-plus-circle" aria-hidden="true"></Icon>
          </IconButton>
        </div>
        {renderError()}
      </>
    </Upload>
  );
};

export default LinkImageUpload;
