import React from 'react'
import Alert from '@material-ui/core/Alert'
import { clearFlashMsg } from '../../state/reducers/flashMsgReducer'
import { useAppDispatch, useRootState } from '../../state/store'
import { PredefinedTimeProgress } from './PredefinedTimeProgress'

interface Props {}

const FlashMsgs: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const state = useRootState()

  return state.flashMsgs.length !== 0 ? (
    <div style={{ position: 'fixed', zIndex: 10000, opacity: 0.95 }}>
      {state.flashMsgs.map(f => (
        <Alert
          className='mt-1'
          key={f.clearAtDate.getTime()}
          variant='filled'
          severity={f.severity}
          onClose={() => dispatch(clearFlashMsg(f.clearAtDate))}>
          {f.message}
          <PredefinedTimeProgress clearDate={f.clearAtDate.getTime()} />
        </Alert>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default FlashMsgs
