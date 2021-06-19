import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/auth';
import PrivateRoute from './components/routes/private';
import AdminProvider from './components/store/admin/provider';
import AdminRoutes from './components/routes/admin';
import ProfessorProvider from './components/store/professor/provider';
import ProfessorRoutes from './components/routes/professor';
import StudentHome from './pages/student/home';
import AuthContext from './components/store/auth/context';
import StudentProvider from './components/store/student/provider';
import StudentRoutes from './components/routes/student';


function Routes() {
    const { token, entity } = useContext(AuthContext);

    // const returnProvider = () => {

    //     console.log(entity)
    //     if (entity === "administrator") {
    //         return (
    //             <AdminProvider>
    //                 <AdminRoutes />
    //             </AdminProvider>
    //         )
    //     }
    //     else if (entity === "professor") {
    //         return (
    //             <ProfessorProvider>
    //                 <ProfessorRoutes />
    //             </ProfessorProvider>
    //         )
    //     } else {
    //         return <PrivateRoute path="/student" routeEntity="student" component={StudentHome} />
    //     }
    // }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Auth} />
                {entity === "administrator" ?
                    <AdminProvider>
                        <AdminRoutes/>
                    </AdminProvider> :
                    <Route path="/" exact component={Auth} />
                }
                {entity === "professor" ?
                    <ProfessorProvider>
                        <ProfessorRoutes/>
                    </ProfessorProvider> :
                    <Route path="/" exact component={Auth} />
                }
                {entity === "student" ?
                    <StudentProvider>
                        <StudentRoutes/>
                    </StudentProvider> :
                    <Route path="/" exact component={Auth} />
                }
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
