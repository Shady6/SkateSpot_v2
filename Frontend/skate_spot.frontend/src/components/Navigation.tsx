import React from 'react'
import { Link } from 'react-router-dom';
import { Routes } from '../routes/appRoutes';
import { useRootState } from '../hooks/useRootState';

const Navigation: React.FC = () => {

    const authState = useRootState().auth

    return (
        <ul>
            <li><Link to={Routes.HOME}>Home</Link></li>
            <li><Link to={Routes.LOGIN}>Login</Link></li>
            <li><Link to={Routes.REGISTER}>Register</Link></li>
            {authState.content?.userName}
        </ul>
    )
}

export default Navigation
