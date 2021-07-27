import React from 'react';
import { Link } from 'react-router-dom';
import hasRouteAccess from '../functions/hasRouteAccess';
import { useRootState } from '../hooks/importIndex';
import routes from '../routes/appRoutes';

const Navigation: React.FC = () => {

    const authState = useRootState().auth

    const renderLinks = () => routes.map(r => hasRouteAccess(r, authState) ?
        <li key={r.linkName}><Link to={r.path}>{r.linkName}</Link></li> : null)

    return (
        <ul>
            {renderLinks()}
            {authState.content?.userName}
        </ul>
    )
}

export default Navigation
