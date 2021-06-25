import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function Topics() {
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
            const getSubscriptions = async () => await api.get("/api/v1/topics", config)

            getSubscriptions()
                .then((response) => {
                    console.log(response)
                    let topicsList = response.data.map((topic) => [topic["id"], topic["class_id"], topic["student_id"], topic["created_at"], topic["status"]])
                    
                    setTopics(topicsList)
                    setResponse(response.data)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setTopics, setResponse])
    return (
        <React.Fragment>
            <ListEntity
                list={topics}
                identity={"administrator"}
                entity={"Aulas"}
                columns={['ID', 'Materia', 'Turma', 'Professor', 'Data', 'Status']}
                create_path={"/admin/topics/create"}
                update_path={"/admin/topics/update"}
                api_path={"/api/v1/topics/"}
            />
        </React.Fragment>
    )
}