import React from 'react';
import PrivateRoute from '../private';
import Header from '../../../components/header';
import ProfessorHome from '../../../pages/professor/home';
import { useProfessorContext } from '../../store/professor/context';
import ProfessorClasses from '../../../pages/professor/classes';
import ProfessorClassesDetails from '../../../pages/professor/classes/details';
import ProfessorTopics from '../../../pages/professor/topics';
import ProfessorTopicsDetails from '../../../pages/professor/topics/details';
import ProfessorTopicsDetailsPhoto from '../../../pages/professor/topics/photo';
import ProfessorTopicsDetailsPresences from '../../../pages/professor/topics/presences';


export default function ProfessorRoutes() {
    const { entities } = useProfessorContext()
    return (
        <React.Fragment>
            <Header entities={entities}>
                <PrivateRoute exact path="/professor" routeEntity="professor" component={ProfessorHome}/>
                <PrivateRoute exact path="/professor/classes" routeEntity="professor" component={ProfessorClasses}/>
                <PrivateRoute path="/professor/classes/details" routeEntity="professor" component={ProfessorClassesDetails}/>
                <PrivateRoute exact path="/professor/topics" routeEntity="professor" component={ProfessorTopics}/>
                <PrivateRoute exact path="/professor/topics/details" routeEntity="professor" component={ProfessorTopicsDetails}/>
                <PrivateRoute exact path="/professor/topics/details/photo" routeEntity="professor" component={ProfessorTopicsDetailsPhoto}/>
                <PrivateRoute exact path="/professor/topics/details/presences" routeEntity="professor" component={ProfessorTopicsDetailsPresences}/>
                {/* <PrivateRoute path="*">
                    <Redirect to="/"/>
                </PrivateRoute> */}
            </Header>
        </React.Fragment>
    )
}