import React from "react";

interface Props {
  videoId: string;
}

export const InstagramVideo = (p: Props) => {
  return (
    <iframe
      title="Instagram video"
      src={`https://www.instagram.com/p/${p.videoId}/embed`}
      width="400"
      height="480"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
};
