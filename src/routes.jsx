import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './pages/auth';
import AdminHome from './pages/home/admin'
import StoreProvider from './components/store/provider'
import PrivateRoute from './components/routes/private'
import ProfessorHome from './pages/home/professor';
import StudentHome from './pages/home/student';

function Routes() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Switch>
                    <Route path="/" exact component={Auth} />
                    <PrivateRoute path="/admin" routeEntity="administrator" component={AdminHome}/>
                    <PrivateRoute path="/professor" routeEntity="professor" component={ProfessorHome}/>
                    <PrivateRoute path="/student" routeEntity="student" component={StudentHome}/>                
                </Switch>
            </StoreProvider>
        </BrowserRouter>
    );
};

export default Routes;
