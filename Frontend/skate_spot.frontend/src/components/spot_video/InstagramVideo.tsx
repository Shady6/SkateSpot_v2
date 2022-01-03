import React from 'react'

interface Props {
  videoId: string
  style?: any
}

export const InstagramVideo = (p: Props) => {
  return (
    <iframe
      style={p.style || { height: 600 }}
      title='Instagram video'
      src={`https://www.instagram.com/p/${p.videoId}/embed`}
      frameBorder='0'
      scrolling='no'></iframe>
  )
}
