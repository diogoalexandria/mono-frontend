import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from '../store/context';

function access(token, entity, routeEntity) {
    console.log("Entrei")
    console.log(entity)
    console.log(routeEntity)
    console.log(entity === routeEntity)
    return token && entity ? entity === routeEntity : false      
}

const PrivateRoute = ({ component: Component, routeEntity, ...rest }) => {
    const { token, entity } = useContext(StoreContext); 
    
    return (
        <Route
            {...rest}
            render={ () => access(token, entity, routeEntity) ? <Component {...rest}/> : <Redirect to="/"/> }
        />
    );
}

export default PrivateRoute;