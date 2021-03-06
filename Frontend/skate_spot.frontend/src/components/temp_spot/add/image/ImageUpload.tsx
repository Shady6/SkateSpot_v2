import React from 'react'
import { getAnyDimStringArrSizeInMb } from '../../../../functions/util/getAnyDimStringArrSizeInMb'
import FileImageUpload from './FileImageUpload'
import LinkImageUpload from './LinkImageUpload'

export const imagesLimit = 10
export const sizeMbLimit = 20

interface Props {
  fromLinkImages: string[]
  setFromLinkImages: React.Dispatch<React.SetStateAction<string[]>>
  fromFileImages: string[]
  setFromFileImages: React.Dispatch<React.SetStateAction<string[]>>
}

const ImageUpload = React.memo(
  ({
    fromLinkImages,
    setFromLinkImages,
    fromFileImages,
    setFromFileImages,
  }: Props) => {
    const renderImageStats = () => {
      const uploadsTotal = fromLinkImages.length + fromFileImages.length
      const uploadsSize = getAnyDimStringArrSizeInMb([
        fromLinkImages,
        fromFileImages,
      ])

      return (
        <p style={{ fontSize: '0.85rem' }} className='text-info m-0'>
          {`Uploaded ${uploadsTotal}/${imagesLimit}, `}
          <span
            className={
              uploadsSize > sizeMbLimit ? 'text-danger' : ''
            }>{`Size ${uploadsSize}/${sizeMbLimit}MBs`}</span>
        </p>
      )
    }

    return (
      <>
        <p className='m-0'>Upload spot images</p>

        {renderImageStats()}

        <div className={'mt-4 mb-3'}>
          <FileImageUpload
            images={fromFileImages}
            setImages={setFromFileImages}
            imagesLimit={imagesLimit}
            otherImagesCount={fromLinkImages.length}
          />
        </div>
        <div>
          <LinkImageUpload
            images={fromLinkImages}
            setImages={setFromLinkImages}
            imagesLimit={imagesLimit}
            otherImagesCount={fromFileImages.length}
          />
        </div>
      </>
    )
  }
)

export default ImageUpload
