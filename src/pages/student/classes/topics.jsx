import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function StudentClassesTopics() {
    const { token } = useContext(AuthContext);    
    const { id, setResponse } = useAppContext();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getClasses = async () => await api.get(`/api/v1/topics_class/${id}`, config)

            getClasses()
                .then((response) => {                                      
                    let classesList = response.data.map((topic) => [topic["id"], topic["class_id"], topic["topic_date"], topic["status"]])
                    
                    setTopics(classesList)
                    setResponse(response.data)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setTopics, setResponse, id])

    return(
        <React.Fragment>            
           <ListEntity
                list={topics} 
                entity={"Aula"}
                columns={['ID', 'Turma', 'Matéria', 'Período', 'Status']}
                details_path={"/student/classes/topics/presences"}
                use_id_details={true}                
            />                       
        </React.Fragment>
    )
}