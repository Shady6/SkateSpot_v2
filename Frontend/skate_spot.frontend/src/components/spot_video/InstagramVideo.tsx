import React from 'react'

interface Props {
  videoId: string
  style?: any
}

export const InstagramVideo = (p: Props) => {
  return (
    <iframe
      style={p.style || { width: '100%', height: 400 }}
      title='Instagram video'
      src={`https://www.instagram.com/p/${p.videoId}/embed`}
      frameBorder='0'
      scrolling='no'></iframe>
  )
}
