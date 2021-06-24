import React from 'react';
import PrivateRoute from '../private';
import Header from '../../../components/header';
import StudentHome from '../../../pages/student/home';
import { useStudentContext } from '../../store/student/context';
import StudentClasses from '../../../pages/student/classes';
import StudentClassesTopics from '../../../pages/student/classes/topics';
import StudentClassesTopicsAttendances from '../../../pages/student/classes/attendances';

export default function StudentRoutes() {
    const { entities } = useStudentContext()
    return (
        <React.Fragment>
            <Header entities={entities}>
                <PrivateRoute exact path="/student" routeEntity="student" component={StudentHome}/>
                <PrivateRoute exact path="/student/classes" routeEntity="student" component={StudentClasses}/>
                <PrivateRoute exact path="/student/classes/topics" routeEntity="student" component={StudentClassesTopics}/>
                <PrivateRoute exact path="/student/classes/topics/presences" routeEntity="student" component={StudentClassesTopicsAttendances}/>                
            </Header>
        </React.Fragment>
    )
}