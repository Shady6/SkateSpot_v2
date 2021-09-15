import { Icon, IconButton, TextField } from "@material-ui/core";
import { linkSync } from "fs";
import { useState } from "react";
import { v4 } from "uuid";
import { useError } from "../../../hooks/useError";
import { useInputState } from "../../../hooks/useInputState";
import { ApiClient } from "../../../skate_spot_api/apiClient";
import { useRootState } from "../../../state/store";
import Upload, { Uploaded } from "../../shared/Upload";

export interface IdLink {
  uuid: string;
  item: {
    name: string;
    url: string;
    b64: string;
    sizeInMB: number;
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
  const authState = useRootState().auth;

  const canUploadImage = () =>
    links.length + otherImagesCount < imagesLimit && input !== "";

  const addLinkToState = (b64: string) => {
    setLinks([
      ...links,
      {
        uuid: v4(),
        item: {
          name: "",
          url: input,
          b64: b64,
          sizeInMB:
            Math.round(
              (new TextEncoder().encode(b64).length / 1024 / 1024) * 100
            ) / 100,
        },
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
    }

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

    // try {
    //   const url = new URL(input);
    //   let img = new Image();
    //   img.onload = (i) => {
    //     // @ts-ignore
    //     console.log(i.path[0]);
    //     setLinks([
    //       ...links,
    //       {
    //         uuid: v4(),
    //         item: {
    //           name: "",
    //           url: input,
    //           size: 1,
    //         },
    //       },
    //     ]);
    //     setImagesUploadedCount(links.length + 1);
    //     resetInput();
    //   };
    //   img.onerror = () => {
    //     setError(`Url contains invalid image - ${input}`);
    //   };
    //   img.src = url.toString();
    // } catch {
    //   setError(`The url is not valid - ${input}`);
    // }
  };

  const renderImageWithInfo = (link: IdLink) => {
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
          src={link.item.b64}
        />
        <span> {link.item.sizeInMB}MBs</span>
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
