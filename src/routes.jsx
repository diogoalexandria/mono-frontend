import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './pages/auth';
import AdminHome from './pages/home/admin'
import StoreProvider from './components/store/provider'
import PrivateRoute from './components/routes/private'

function Routes() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Switch>
                    <Route path="/" exact component={Auth} />
                    <PrivateRoute path="/admin" component={AdminHome}/>                
                </Switch>
            </StoreProvider>
        </BrowserRouter>
    );
};

export default Routes;
