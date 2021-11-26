import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Routes } from '../../routes/appRoutes'
import { logout } from '../../state/actions/authActions'
import { createFlashMsgWithTimeout } from '../../state/reducers/flashMsgReducer'

interface Props {}

export const Logout: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(logout())
    dispatch(
      createFlashMsgWithTimeout({
        message: 'Logged out successfuly!',
        severity: 'success',
        clearAtDate: new Date(Date.now() + 10000),
      })
    )
    history.push(Routes.HOME)
  }, [])

  return <></>
}
