import { getStringSizeInMb } from "./util/getStringSizeInMb";

export const renderImageWithSizeInfo = (b64Image: string) => {
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
        src={b64Image}
      />
      <span> {getStringSizeInMb(b64Image)}MBs</span>
    </>
  );
};
