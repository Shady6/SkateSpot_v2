import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInputState } from '../../hooks/useInputState';
import { useRootState } from '../../hooks/useRootState';
import { login } from '../../state/auth/authActions';
import { AuthStateEnum } from '../../state/auth/authReducer';

const Login: React.FC = () => {

    const [email, setInputEmail] = useInputState("")
    const [password, setInputPassword] = useInputState("")
    const [usedLoginButton, setUsedLoginButton] = useState(false)

    const authState = useRootState().auth

    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(() => {
        if (usedLoginButton && authState.status === AuthStateEnum.OK)
            history.push("/")
    }, [authState.status])

    return (
        <Container>
            <FormGroup>
                <FormControl margin={"dense"}>
                    <InputLabel htmlFor="email-input">Email address</InputLabel>
                    <Input
                        id="email-input"
                        value={email}
                        onChange={setInputEmail}
                    />
                </FormControl>
                <FormControl margin={"dense"}>
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <Input
                        type={"password"}
                        id="password-input"
                        value={password}
                        onChange={setInputPassword}
                    />
                </FormControl>
                {
                    authState.status === AuthStateEnum.FAILED &&
                    <Alert severity="error">{authState.error}</Alert>
                }
                <Button onClick={() => {
                    dispatch(login({ email: email, password: password }))          
                    setUsedLoginButton(true)
                }}>
                    Login
                </Button>
            </FormGroup>
        </Container>
    )
}

export default Login

