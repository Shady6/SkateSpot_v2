import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {login as loginAction} from './state/auth/authActions';

const App = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = bindActionCreators(loginAction, useDispatch())

  const updateStateFromTextInput = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setState: React.Dispatch<React.SetStateAction<string>>) => {
      setState(e.target.value)
  }

  const clearTextStates = (setStateFunctions: Array<React.Dispatch<React.SetStateAction<string>>>) => {
    setStateFunctions.forEach(setState => setState(""))
  }

  return (
    <>     
          <label htmlFor="">email</label>
          <input 
          value={email} 
          onChange={(e) => updateStateFromTextInput(e, setEmail)} type="text" name="" id="" />  
          <label htmlFor="">password</label>
          <input 
          value={password}
           onChange={(e) => updateStateFromTextInput(e, setPassword)} type="text" name="" id="" />  
          <button onClick={() => {
            login({email: email, password: password})
            clearTextStates([setEmail, setPassword])
            }}>Login</button>
    </>
  );
}

export default App;
