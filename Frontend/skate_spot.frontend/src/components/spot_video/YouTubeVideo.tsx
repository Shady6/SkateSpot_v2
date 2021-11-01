import React from "react";

interface Props {
  videoId: string;
}

export const YouTubeVideo = (p: Props) => {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${p.videoId}`}
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};
