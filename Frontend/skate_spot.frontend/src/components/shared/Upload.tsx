import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { useError } from '../../hooks/small_text_feedback/useError'

interface Props {
  uploadedItems: any[]
  setUploadedItems: React.Dispatch<React.SetStateAction<any[]>>
  otherUploadedItemsCount: number
  uploadLimit: number
  uploadedItemPluralized: string
  onUploadBtnClick: () => void
  uploadedCount: number
  setUploadedCount: React.Dispatch<React.SetStateAction<number>>
  renderItem: (item: any) => JSX.Element
  uploadText: string
}

const Upload: React.FC<Props> = ({
  children,
  uploadedItems,
  setUploadedItems,
  otherUploadedItemsCount,
  uploadLimit,
  uploadedItemPluralized,
  onUploadBtnClick,
  uploadedCount,
  setUploadedCount,
  renderItem,
  uploadText,
}) => {
  const renderError = useError(() => {
    const totalUploads = uploadedCount + otherUploadedItemsCount
    let error = ''

    if (otherUploadedItemsCount >= uploadLimit)
      error = `You can't upload more ${uploadedItemPluralized} because you've reached the images limit.`
    else if (totalUploads > uploadLimit) {
      const uploadsToTake = uploadLimit - otherUploadedItemsCount
      error = `Only ${uploadsToTake} ${uploadedItemPluralized} of ${uploadedCount} were uploaded because of the limit`
      setUploadedCount(uploadsToTake)
    }
    return error
  }, [uploadedItems])

  function renderUploadedItemsData() {
    if (uploadedItems.length)
      return (
        <div>
          <p className={'mb-1'}>
            Uploaded {uploadedItemPluralized}: {uploadedItems!.length}
          </p>
          <div className={'d-flex flex-wrap'}>
            {uploadedItems!.map((item, currentIndex) => (
              <Button
                className={'p-1 me-3 mb-2 text-sm'}
                key={uuid()}
                onClick={_ =>
                  setUploadedItems([
                    ...uploadedItems.filter(
                      (_, fromStateItemIndex) =>
                        fromStateItemIndex !== currentIndex
                    ),
                  ])
                }>
                <Typography style={{ textTransform: 'none' }}>
                  {renderItem(item)}
                </Typography>
                <i className='fa fa-times-circle ms-2' aria-hidden='true'></i>
              </Button>
            ))}
          </div>
        </div>
      )
  }

  return (
    <div className='mb-2'>
      <div className='d-flex flex-column'>
        <div className='order-2'>
          <Button
            variant='contained'
            onClick={onUploadBtnClick}
            className={'me-1'}>
            {uploadText}
          </Button>
          {uploadedItems.length !== 0 && (
            <Button
              variant='contained'
              color='warning'
              onClick={_ => {
                setUploadedItems([])
                setUploadedCount(0)
              }}>
              Remove all
            </Button>
          )}
        </div>
        {children}
      </div>
      {renderError()}
      {renderUploadedItemsData()}
    </div>
  )
}

export default Upload
