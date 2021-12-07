import {
  Button,
  Container,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useInputState } from '../../hooks/util/useInputState'
import { login } from '../../state/actions/authActions'
import { useAppDispatch } from '../../state/store'

export const Login: React.FC = () => {
  const [email, setEmail] = useInputState('')
  const [password, setPassword] = useInputState('')

  const history = useHistory()
  const dispatch = useAppDispatch()

  return (
    <Container className='mt-5'>
      <FormGroup>
        <FormControl margin={'dense'}>
          <InputLabel htmlFor='email'>Email Address</InputLabel>
          <Input id='email' value={email} onChange={setEmail} />
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
        <Button
          onClick={() => {
            dispatch(
              login({
                loginData: { email: email, password: password },
                history,
              })
            )
          }}>
          Login
        </Button>
      </FormGroup>
    </Container>
  )
}
