import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './pages/auth';
import AuthProvider from './components/store/auth/provider'
import AdminHome from './pages/admin/home'
import Users from './pages/admin/users';
import CreateUser from './pages/admin/users/create';
import UpdateUser from './pages/admin/users/update';
import Courses from './pages/admin/courses';
import Subjects from './pages/admin/subjects';
import Classes from './pages/admin/classes';
import Subscriptions from './pages/admin/subscriptions';
import PrivateRoute from './components/routes/private'
import ProfessorHome from './pages/professor/home';
import StudentHome from './pages/student/home';
import AdminProvider from './components/store/admin/provider';

function Routes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path="/" exact component={Auth} />
                    <AdminProvider>
                        <PrivateRoute exact path="/admin" routeEntity="administrator" component={AdminHome}/>
                        <PrivateRoute exact path="/admin/users" routeEntity="administrator" component={Users}/>
                        <PrivateRoute path="/admin/users/create" routeEntity="administrator" component={CreateUser}/>
                        <PrivateRoute path="/admin/users/update" routeEntity="administrator" component={UpdateUser}/>
                        <PrivateRoute path="/admin/courses" routeEntity="administrator" component={Courses}/>
                        <PrivateRoute path="/admin/subjects" routeEntity="administrator" component={Subjects}/>
                        <PrivateRoute path="/admin/classes" routeEntity="administrator" component={Classes}/>
                        <PrivateRoute path="/admin/subscriptions" routeEntity="administrator" component={Subscriptions}/>
                    </AdminProvider>
                    <PrivateRoute path="/professor" routeEntity="professor" component={ProfessorHome}/>
                    <PrivateRoute path="/student" routeEntity="student" component={StudentHome}/>                
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Routes;
