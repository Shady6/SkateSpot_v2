import React from 'react'
import { Button, Icon, IconButton, TextField } from '@material-ui/core'
import { useState } from 'react'
import { renderImageWithSizeInfo } from '../../../../functions/util/renderImageWithSizeInfo'
import { useError } from '../../../../hooks/small_text_feedback/useError'
import { useInputState } from '../../../../hooks/util/useInputState'
import { ApiClient } from '../../../../skate_spot_api/apiClient'
import { useRootState } from '../../../../state/store'
import Upload from '../../../shared/Upload'

interface Props {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  otherImagesCount: number
  imagesLimit: number
}

const LinkImageUpload: React.FC<Props> = ({
  images,
  setImages,
  otherImagesCount,
  imagesLimit,
}) => {
  const [uploadedImagesCount, setImagesUploadedCount] = useState(0)
  const [input, setInput, resetInput] = useInputState('')
  const [error, setError] = useState('')

  const renderError = useError(() => error, [error])
  const authState = useRootState().auth

  const canUploadImage = () =>
    images.length + otherImagesCount < imagesLimit && input !== ''

  const addLinkToState = (b64: string) => {
    setImages([...images, b64])
  }

  const addImage = async () => {
    if (!canUploadImage()) return

    setError('')

    if (input.startsWith('data:image')) {
      addLinkToState(input)
      resetInput()
    } else {
      try {
        const res = await new ApiClient().get_Base64_Images(
          [input],
          'Bearer ' + authState?.content?.jwToken ?? ''
        )
        if (res!.content![0]!.success) {
          addLinkToState(res!.content![0]!.base64 as string)
          resetInput()
        } else setError(`The url contains invalid image - ${input}`)
      } catch {
        setError("Couldn't load your image now, try later.")
      }
    }
  }

  return (
    <Upload
      uploadedItems={images}
      setUploadedItems={setImages}
      otherUploadedItemsCount={otherImagesCount}
      uploadLimit={imagesLimit}
      uploadedItemPluralized={'images'}
      onUploadBtnClick={addImage}
      uploadedCount={uploadedImagesCount}
      setUploadedCount={setImagesUploadedCount}
      renderItem={renderImageWithSizeInfo}
      uploadText='Upload URL'>
      <div className='order-1 mb-2'>
        <TextField
          value={input}
          onKeyDown={e => {
            if (e.key === 'Enter') addImage()
          }}
          onChange={setInput}
          variant='standard'
          label='Url'
        />
        {renderError()}
      </div>
    </Upload>
  )
}

export default LinkImageUpload
