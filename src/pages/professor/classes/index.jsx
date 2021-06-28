import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function ProfessorClasses() {
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
            const getClasses = async () => await api.get("/api/v1/classes_professor", config)

            getClasses()
                .then((response) => {
                    
                    let classesList = response.data.map((classItem) => [classItem["id"], classItem["name"], classItem["subject_id"], classItem["professor_id"], classItem["status"]])
                    
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
                columns={['ID', 'Matéria', 'Período', 'Status']}
                details_path={"/professor/classes/details"}                
            />                       
        </React.Fragment>
    )
}