import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../store/auth/context';

function access(token, entity, routeEntity) {    
    return token && entity ? entity === routeEntity : false      
}

const PrivateRoute = ({ component: Component, routeEntity, ...rest }) => {
    const { token, entity } = useContext(AuthContext); 
    
    return (
        <Route
            {...rest}
            render={ () => access(token, entity, routeEntity) ? <Component {...rest}/> : <Redirect to="/"/> }
        />
    );
}

export default PrivateRoute;