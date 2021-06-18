import React from 'react';
import { useAdminContext } from '../../store/admin/context';
import PrivateRoute from '../private';
import Header from '../../../components/header';
import AdminHome from '../../../pages/admin/home';
import Users from '../../../pages/admin/users';
import CreateUser from '../../../pages/admin/users/create';
import UpdateUser from '../../../pages/admin/users/update';
import Courses from '../../../pages/admin/courses';
import CreateCourse from '../../../pages/admin/courses/create';
import UpdateCourse from '../../../pages/admin/courses/update';
import Subjects from '../../../pages/admin/subjects';
import CreateSubject from '../../../pages/admin/subjects/create';
import UpdateSubject from '../../../pages/admin/subjects/update';
import Classes from '../../../pages/admin/classes';
import Subscriptions from '../../../pages/admin/subscriptions';
import Topics from '../../../pages/admin/topics';

export default function AdminRoutes() {
    const { entities } = useAdminContext()
    return (
        <Header entities={entities}>
            <PrivateRoute exact path="/admin" routeEntity="administrator" component={AdminHome}/>
            <PrivateRoute exact path="/admin/users" routeEntity="administrator" component={Users}/>
            <PrivateRoute path="/admin/users/create" routeEntity="administrator" component={CreateUser}/>
            <PrivateRoute path="/admin/users/update" routeEntity="administrator" component={UpdateUser}/>
            <PrivateRoute exact path="/admin/courses" routeEntity="administrator" component={Courses}/>
            <PrivateRoute path="/admin/courses/create" routeEntity="administrator" component={CreateCourse}/>
            <PrivateRoute path="/admin/courses/update" routeEntity="administrator" component={UpdateCourse}/>
            <PrivateRoute exact path="/admin/subjects" routeEntity="administrator" component={Subjects}/>
            <PrivateRoute path="/admin/subjects/create" routeEntity="administrator" component={CreateSubject}/>
            <PrivateRoute path="/admin/subjects/update" routeEntity="administrator" component={UpdateSubject}/>
            <PrivateRoute path="/admin/classes" routeEntity="administrator" component={Classes}/>
            <PrivateRoute path="/admin/subscriptions" routeEntity="administrator" component={Subscriptions}/>
            <PrivateRoute path="/admin/topics" routeEntity="administrator" component={Topics}/>
        </Header>
    )
}