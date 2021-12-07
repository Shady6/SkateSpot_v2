import {
  Container,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from '@material-ui/core'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useInputState } from '../../hooks/util/useInputState'
import { RoutesEnum } from '../../routes/appRoutes'
import { register } from '../../state/actions/authActions'
import { AuthState } from '../../state/reducers/authReducer'
import { createFlashMsgWithTimeout } from '../../state/reducers/flashMsgReducer'
import { RootState, useAppDispatch } from '../../state/store'

export const Register: React.FC = () => {
  const [email, setEmail] = useInputState('')
  const [username, setUsername] = useInputState('')
  const [password, setPassword] = useInputState('')
  const [repeatPassword, setRepeatPassword] = useInputState('')

  const history = useHistory()

  const auth = useSelector<RootState, AuthState>(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (auth.registerSuccess) {
      dispatch(
        createFlashMsgWithTimeout({
          message: 'Registration successful, you can login now',
          severity: 'success',
        })
      )
      history.push(RoutesEnum.LOGIN)
    }
  }, [auth.registerSuccess])

  return (
    <Container className='mt-5'>
      <FormGroup>
        <FormControl margin={'dense'}>
          <InputLabel htmlFor='email'>Email Address</InputLabel>
          <Input id='email' value={email} onChange={setEmail} />
        </FormControl>
        <FormControl margin={'dense'}>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input id='username' value={username} onChange={setUsername} />
        </FormControl>
        <FormControl margin={'dense'}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            type={'password'}
            id='password'
            value={password}
            onChange={setPassword}
          />
        </FormControl>
        <FormControl margin={'dense'}>
          <InputLabel htmlFor='repeat-password'>Repeat Password</InputLabel>
          <Input
            type={'password'}
            id='repeat-password'
            value={repeatPassword}
            onChange={setRepeatPassword}
          />
        </FormControl>
        <LoadingButton
          loading={auth.registerLoading}
          onClick={() => {
            dispatch(
              register({
                userName: username,
                password,
                confirmPassword: repeatPassword,
                email,
              })
            )
          }}>
          Login
        </LoadingButton>
      </FormGroup>
    </Container>
  )
}
