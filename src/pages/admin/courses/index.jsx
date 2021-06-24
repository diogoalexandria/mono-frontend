import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function Courses() {
    const { token } = useContext(AuthContext);
    const { setResponse } = useAppContext();
    const [courses, setCourses] = useState([]);   

    useEffect(() => {        
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }        
        try{
            const getCourses = async () => await api.get("/api/v1/courses", config)                
            
            getCourses()
                .then((response) => {                                        
                    let coursesList = response.data.map((course) => {                        
                        return [course["id"], course["name"], course["status"]]
                    })
                                      
                    setCourses(coursesList)
                    setResponse(response.data)
                })            
            
        }catch(err) {
            console.log(err)
        }

    }, [token, setCourses, setResponse])
    return (
        <React.Fragment>
            <ListEntity
                list={courses}
                identity={"administrator"}
                entity={"Curso"}
                columns={['ID', 'Nome', 'Status']}
                create_path={"/admin/courses/create"}
                update_path={"/admin/courses/update"}
                api_path={"/api/v1/courses/"}
            />
        </React.Fragment>
    )
}