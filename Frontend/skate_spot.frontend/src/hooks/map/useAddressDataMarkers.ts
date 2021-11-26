import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendRequestWithFlashMsgOnError } from '../../functions/request/sendRequestWithFlashMsgOnError'
import { SpotMarkerDataDto } from '../../skate_spot_api/client'
import { useRootState } from '../../state/store'

export const useAddressDataMarkers = () => {
  const [spotMarkerData, setSpotMarkerData] = useState<SpotMarkerDataDto[]>()
  const authState = useRootState().auth
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      const r = await sendRequestWithFlashMsgOnError(
        dispatch,
        authState.content,
        c => c.get_Perma_And_Temp_Spots_Marker_Data()
      )
      setSpotMarkerData(r?.content || [])
    })()
  }, [])

  return spotMarkerData
}
