import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from "../../state/import_indexes/authIndex"
import { useInputState, useRootState } from '../../hooks/importIndex';
import { Routes } from '../../routes/appRoutes';

const Login: React.FC = () => {

    const [email, setInputEmail] = useInputState("")
    const [password, setInputPassword] = useInputState("")
    const [usedLoginButton, setUsedLoginButton] = useState(false)

    const history = useHistory()

    const authState = useRootState().auth
    const dispatch = useDispatch()

    useEffect(() => {
        if (usedLoginButton && authState.content)
            history.push(Routes.HOME)
    }, [authState.content])

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
                    authState.error &&
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

