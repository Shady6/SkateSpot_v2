import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useInputState } from '../../hooks/useInputState';
import { login as loginAction } from '../../state/auth/authActions';

interface Props {

}

function Login({ }: Props): ReactElement {

    const [email, setInputEmail, clearEmail] = useInputState("")
    const [password, setInputPassword, clearPassword] = useInputState("")

    const login = bindActionCreators(loginAction, useDispatch())

    return (
        <div>
            <label htmlFor="">email</label>
            <input
                value={email}
                type="email"
                onChange={setInputEmail} name="" id="" />
            <label htmlFor="">password</label>
            <input
                value={password}
                type="password"
                onChange={(e) => updateStateFromTextInput(e, setInputPassword)} name="" id="" />
            <button onClick={() => {
                login({ email: email, password: password })
                clearTextStates([setInputEmail, setInputPassword])
            }}>Login</button>
        </div>
    )
}

export default Login

