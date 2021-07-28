import React from 'react';
import { Link } from 'react-router-dom';
import hasRouteAccess from '../functions/hasRouteAccess';
import { useRootState } from '../hooks/importIndex';
import routes from '../routes/appRoutes';
import { useDispatch } from 'react-redux';
import {logout} from "../state/action_creators/authActionCreators"

const Navigation: React.FC = () => {

    const authState = useRootState().auth
    const dispatch = useDispatch()


    const renderLinks = () => routes.map(r => hasRouteAccess(r, authState) ?
        <li key={r.linkName}><Link to={r.path}>{r.linkName}</Link></li> : null)

    return (
        <ul>
            {renderLinks()}
            {authState.content && 
            <p 
            style={{cursor: "pointer"}}
            onClick={() => dispatch(logout())}>Logout</p>}
            {authState.content?.userName}
        </ul>
    )
}

export default Navigation
