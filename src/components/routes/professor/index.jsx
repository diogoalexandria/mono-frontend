import React from 'react';
import PrivateRoute from '../private';
import Header from '../../../components/header';
import ProfessorHome from '../../../pages/professor/home';
import { useProfessorContext } from '../../store/professor/context';
import ProfessorClasses from '../../../pages/professor/classes';
import { Redirect } from 'react-router-dom';


export default function ProfessorRoutes() {
    const { entities } = useProfessorContext()
    return (
        <React.Fragment>
            <Header entities={entities}>
                <PrivateRoute exact path="/professor" routeEntity="professor" component={ProfessorHome}/>
                <PrivateRoute exact path="/professor/classes" routeEntity="professor" component={ProfessorClasses}/>
                <PrivateRoute path="/professor/classes/details" routeEntity="professor" component={ProfessorClasses}/>
                {/* <Redirect to="/"/> */}
            </Header>
        </React.Fragment>
    )
}