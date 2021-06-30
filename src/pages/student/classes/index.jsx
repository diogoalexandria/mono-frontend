import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function StudentClasses() {
    const { token } = useContext(AuthContext);
    const { setResponse } = useAppContext();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getClasses = async () => await api.get("/api/v1/classes_student", config)

            getClasses()
                .then((response) => {                   
                    let classesList = response.data.map((topic) => [topic["id"], topic["name"], topic["subject_id"], topic["status"]])
                    
                    setClasses(classesList)
                    setResponse(response.data)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setClasses, setResponse])

    return(
        <React.Fragment>            
           <ListEntity
                list={classes} 
                entity={"Turma"}
                columns={['ID', 'Turma', 'Status']}
                details_path={"/student/classes/topics"}                
            />                       
        </React.Fragment>
    )
}