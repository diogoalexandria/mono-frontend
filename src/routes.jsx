import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/auth';
import AdminProvider from './components/store/admin/provider';
import AdminRoutes from './components/routes/admin';
import ProfessorProvider from './components/store/professor/provider';
import ProfessorRoutes from './components/routes/professor';
import AuthContext from './components/store/auth/context';
import StudentProvider from './components/store/student/provider';
import StudentRoutes from './components/routes/student';
import AppProvider from './components/store/app/provider';


function Routes() {
    const { entity } = useContext(AuthContext);


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Auth} />
                {entity === "administrator" ?
                    <AppProvider>
                        <AdminProvider>
                            <AdminRoutes />
                        </AdminProvider>
                    </AppProvider> :
                    <Route path="/" exact component={Auth} />
                }
                {entity === "professor" ?
                    <AppProvider>
                        <ProfessorProvider>
                            <ProfessorRoutes />
                        </ProfessorProvider>
                    </AppProvider> :
                    <AppProvider>
                        <StudentProvider>
                            <StudentRoutes />
                        </StudentProvider>
                    </AppProvider>
                }
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
