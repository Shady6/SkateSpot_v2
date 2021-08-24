import React from 'react';
import { Link } from 'react-router-dom';
import hasRouteAccess from '../functions/hasRouteAccess';
import routes from '../routes/appRoutes';
import { logout } from "../state/actions/authActions";
import { useAppDispatch, useRootState } from '../state/store';

const Navigation: React.FC = () => {

    const authState = useRootState().auth
    const dispatch = useAppDispatch()


    const renderLinks = () => routes.map(r => hasRouteAccess(r, authState) ?
        <li className={"me-5"} key={r.linkName}><Link to={r.path}>{r.linkName}</Link></li> : null)

    return (
        <ul className={"d-flex"}>
            {renderLinks()}
            {authState.content && 
            <li 
            className={"me-5"}
            style={{cursor: "pointer"}}
            onClick={() => dispatch(logout())}>Logout</li>}
            <li>{authState.content?.userName}</li>            
        </ul>
    )
}

export default Navigation
