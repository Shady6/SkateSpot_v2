import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login as loginAction } from './state/auth/authActions';
import { RootState } from './state/index';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {

  return (
    <>
      <Login />
      <Register />
    </>
  );
}

export default App;
