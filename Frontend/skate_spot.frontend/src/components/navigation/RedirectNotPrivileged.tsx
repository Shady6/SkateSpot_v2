import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RoutesEnum } from '../../routes/appRoutes'
import { AuthState } from '../../state/reducers/authReducer'
import { createFlashMsgWithTimeout } from '../../state/reducers/flashMsgReducer'
import { RootState } from '../../state/store'

export const RedirectNotPrivileged = () => {
  const dispatch = useDispatch()
  const auth = useSelector<RootState, AuthState>(state => state.auth)

  useEffect(() => {
    dispatch(
      createFlashMsgWithTimeout({
        message: auth.content ? "You can't do this" : 'Please login first',
        severity: 'info',
        clearAtDate: new Date(Date.now() + 5000),
      })
    )
  }, [])

  return <Redirect to={RoutesEnum.HOME} />
}
