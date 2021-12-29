import React from 'react'

interface Props {
  videoId: string
  style?: any
}

export const YouTubeVideo = (p: Props) => {
  return (
    <iframe
      style={p.style || { width: '100%', height: 400 }}
      src={`https://www.youtube.com/embed/${p.videoId}`}
      title='YouTube video player'
      frameBorder={0}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen></iframe>
  )
}
