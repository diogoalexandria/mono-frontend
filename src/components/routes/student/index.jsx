import React from 'react';
import PrivateRoute from '../private';
import Header from '../../../components/header';
import StudentHome from '../../../pages/student/home';
import { useStudentContext } from '../../store/student/context';
import { Redirect } from 'react-router-dom';


export default function StudentRoutes() {
    const { entities } = useStudentContext()
    return (
        <React.Fragment>
            <Header entities={entities}>
                <PrivateRoute exact path="/student" routeEntity="student" component={StudentHome}/>
                {/* <PrivateRoute exact path="/admin/users" routeEntity="administrator" component={Users}/>
                <PrivateRoute path="/admin/users/create" routeEntity="administrator" component={CreateUser}/>
                <PrivateRoute path="/admin/users/update" routeEntity="administrator" component={UpdateUser}/>
                <PrivateRoute exact path="/admin/courses" routeEntity="administrator" component={Courses}/>
                <PrivateRoute path="/admin/courses/create" routeEntity="administrator" component={CreateCourse}/>
                <PrivateRoute path="/admin/courses/update" routeEntity="administrator" component={UpdateCourse}/>
                <PrivateRoute exact path="/admin/subjects" routeEntity="administrator" component={Subjects}/>
                <PrivateRoute path="/admin/subjects/create" routeEntity="administrator" component={CreateSubject}/>
                <PrivateRoute path="/admin/subjects/update" routeEntity="administrator" component={UpdateSubject}/>
                <PrivateRoute exact path="/admin/classes" routeEntity="administrator" component={Classes}/>
                <PrivateRoute path="/admin/classes/create" routeEntity="administrator" component={CreateClass}/>
                <PrivateRoute path="/admin/classes/update" routeEntity="administrator" component={UpdateClass}/>
                <PrivateRoute exact path="/admin/subscriptions" routeEntity="administrator" component={Subscriptions}/>
                <PrivateRoute path="/admin/subscriptions/create" routeEntity="administrator" component={CreateSubscription}/>
                <PrivateRoute path="/admin/subscriptions/update" routeEntity="administrator" component={UpdateSubscription}/>
                <PrivateRoute exact path="/admin/topics" routeEntity="administrator" component={Topics}/>
                <PrivateRoute path="/admin/topics/create" routeEntity="administrator" component={CreateTopic}/>
                <PrivateRoute path="/admin/topics/update" routeEntity="administrator" component={UpdateTopic}/> */}
                <Redirect to="/"/>
            </Header>
        </React.Fragment>
    )
}