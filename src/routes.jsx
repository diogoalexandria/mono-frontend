import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './pages/auth';
import AuthProvider from './components/store/auth/provider'
import AdminProvider from './components/store/admin/provider';
import PrivateRoute from './components/routes/private';
import AdminRoutes from './components/routes/admin';
import ProfessorHome from './pages/professor/home';
import StudentHome from './pages/student/home';


function Routes() {
    
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path="/" exact component={Auth} />
                    <AdminProvider>
                        <AdminRoutes/>
                    </AdminProvider>
                    <PrivateRoute path="/professor" routeEntity="professor" component={ProfessorHome}/>
                    <PrivateRoute path="/student" routeEntity="student" component={StudentHome}/>                
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Routes;
