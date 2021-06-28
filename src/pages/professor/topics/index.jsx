import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function ProfessorTopics() {
    const { token } = useContext(AuthContext);
    const { setResponse } = useAppContext();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getTopics = async () => await api.get("/api/v1/topics_professor", config)

            getTopics()
                .then((response) => {                   
                    let classesList = response.data.map((topic) => [topic["id"], topic["name"], topic["subject_id"], topic["topic_date"], topic["status"]])
                    
                    setTopics(classesList)
                    setResponse(response.data)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setTopics, setResponse])
    
    return(
        <React.Fragment>            
           <ListEntity
                list={topics} 
                entity={"Aula"}
                columns={['ID', 'Turma', 'Matéria', 'Data', 'Status']}
                details_path={"/professor/topics/details"}                
            />                       
        </React.Fragment>
    )
}