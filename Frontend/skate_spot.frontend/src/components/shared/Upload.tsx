import { Button, Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { TypographyStyleOptions } from "@material-ui/core/styles/createTypography";
import React from "react";
import { useError } from "../../hooks/useError";

export interface Uploaded {
  uuid: string;
  item: {
    name: string;
  };
}

interface Props<T extends Uploaded> {
  uploadedItems: Array<T>;
  setUploadedItems: React.Dispatch<React.SetStateAction<Array<T>>>;
  otherUploadedItemsCount: number;
  uploadLimit: number;
  uploadedItemPluralized: string;
  onUploadBtnClick: () => void;
  uploadedCount: number;
  setUploadedCount: React.Dispatch<React.SetStateAction<number>>;
  showUploadButton: boolean;
  renderItem: (item: T) => JSX.Element;
  buttonStyles?: TypographyStyleOptions;
}

function Upload<T extends Uploaded>({
  children,
  uploadedItems,
  setUploadedItems,
  otherUploadedItemsCount,
  uploadLimit,
  uploadedItemPluralized,
  onUploadBtnClick,
  uploadedCount,
  setUploadedCount,
  showUploadButton = true,
  renderItem,
  buttonStyles,
}: React.PropsWithChildren<Props<T>>) {
  const renderError = useError(() => {
    const totalUploads = uploadedCount + otherUploadedItemsCount;
    let error = "";

    if (otherUploadedItemsCount >= uploadLimit)
      error = `You can't upload more ${uploadedItemPluralized} because you've reached the images limit.`;
    else if (totalUploads > uploadLimit) {
      const uploadsToTake = uploadLimit - otherUploadedItemsCount;
      error = `Only ${uploadsToTake} ${uploadedItemPluralized} of ${uploadedCount} were uploaded because of the limit`;
      setUploadedCount(uploadsToTake);
    }
    return error;
  }, [uploadedItems]);

  function renderUploadedItemsData() {
    if (uploadedItems.length)
      return (
        <div>
          <p className={"mb-1"}>
            Uploaded {uploadedItemPluralized}: {uploadedItems!.length}
          </p>
          <div className={"d-flex flex-wrap"}>
            {uploadedItems!.map((x) => (
              <Button
                className={"p-1 me-3 mb-2 text-sm"}
                key={x.uuid}
                onClick={(_) =>
                  setUploadedItems([
                    ...uploadedItems.filter((stateU) => stateU.uuid !== x.uuid),
                  ])
                }
              >
                <Typography style={{ textTransform: "none" }}>
                  {renderItem(x)}
                </Typography>
                <i className="fa fa-times-circle ms-2" aria-hidden="true"></i>
              </Button>
            ))}
          </div>
        </div>
      );
  }

  return (
    <div className="mb-2">
      <Button
        hidden={!showUploadButton}
        variant="contained"
        onClick={onUploadBtnClick}
        className={"me-1"}
      >
        Upload Files
      </Button>
      {uploadedItems.length !== 0 && (
        <Button
          variant="contained"
          color="warning"
          onClick={(_) => {
            setUploadedItems([]);
            setUploadedCount(0);
          }}
        >
          Remove all
        </Button>
      )}
      {renderError()}
      {children}
      {renderUploadedItemsData()}
    </div>
  );
}

export default Upload;
