import { Icon, IconButton, TextField } from "@material-ui/core";
import { useState } from "react";
import { useError } from "../../../hooks/useError";
import { useInputState } from "../../../hooks/useInputState";
import { ApiClient } from "../../../skate_spot_api/apiClient";
import { useRootState } from "../../../state/store";
import Upload from "../../shared/Upload";

export interface LinkImage {
  name: string;
  url: string;
  b64: string;
  sizeInMB: number;
}

interface Props {
  links: LinkImage[];
  setLinks: React.Dispatch<React.SetStateAction<LinkImage[]>>;
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
  const authState = useRootState().auth;

  const canUploadImage = () =>
    links.length + otherImagesCount < imagesLimit && input !== "";

  const addLinkToState = (b64: string) => {
    setLinks([
      ...links,
      {
        name: "",
        url: input,
        b64: b64,
        sizeInMB:
          Math.round(
            (new TextEncoder().encode(b64).length / 1024 / 1024) * 100
          ) / 100,
      },
    ]);
  };

  const addImage = async () => {
    if (!canUploadImage()) return;

    setUrl(input);
    setError("");

    if (input.startsWith("data:image")) {
      addLinkToState(input);
      resetInput();
    } else {
      try {
        const res = await new ApiClient().get_Base64_Images(
          [input],
          "Bearer " + authState?.content?.jwToken ?? ""
        );
        if (res!.content![0]!.success) {
          addLinkToState(res!.content![0]!.base64 as string);
          resetInput();
        } else setError(`The url contains invalid image - ${input}`);
      } catch {
        setError("Couldn't load your image now, try later.");
      }
    }
  };

  const renderImageWithInfo = (linkImage: LinkImage) => {
    return (
      <>
        <img
          alt="Your uploaded spot img"
          style={{
            maxWidth: 100,
            maxHeight: 100,
            width: "auto",
            height: "auto",
          }}
          src={linkImage.b64}
        />
        <span> {linkImage.sizeInMB}MBs</span>
      </>
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
      renderItem={renderImageWithInfo}
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
