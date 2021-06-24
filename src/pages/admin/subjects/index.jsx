import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function Subjects() {
    const { token } = useContext(AuthContext);
    const { setResponse } = useAppContext();
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getCourses = async () => await api.get("/api/v1/subjects", config)

            getCourses()
                .then((response) => {
                    let coursesList = response.data.map((course) => {
                        return [course["id"], course["name"], course["status"]]
                    })

                    setSubjects(coursesList)
                    setResponse(response.data)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setSubjects, setResponse])
    return (
        <React.Fragment>
            <ListEntity
                list={subjects}
                identity={"administrator"}
                entity={"Matéria"}
                columns={['ID', 'Nome', 'Status']}
                create_path={"/admin/subjects/create"}
                update_path={"/admin/subjects/update"}
                api_path={"/api/v1/subjects/"}
            />
        </React.Fragment>
    )
}