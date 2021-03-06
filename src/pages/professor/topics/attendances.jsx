import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function ProfessorTopicsDetailsPresences() {
    const { token } = useContext(AuthContext);
    const { id } = useAppContext();
    
    const [attendances, setAttendances] = useState([]);   

    useEffect(() => {        
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }        
        try{            
            const getAttendances = async () => await api.get(`/api/v1/attendances_topic/${id}`, config)                
            
            getAttendances()
                .then((response) => {                                                           
                    let attendancesList = response.data.map((attendance) => {                        
                        return [attendance["student_id"], `${attendance["first_name"]} ${attendance["last_name"]}`]
                    })                    
                    setAttendances(attendancesList)    
                })            
            
        }catch(err) {
            console.log(err)
        }

    }, [token, setAttendances, id])

    return(
        <React.Fragment>            
           <ListEntity
                list={attendances}
                type="details"              
                columns={['ID', 'Aluno']}
                details_path={"/professor/classes/details"}                
            />                       
        </React.Fragment>
    )
}