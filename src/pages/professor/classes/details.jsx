import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function ProfessorClassesDetails() {
    
    const { token } = useContext(AuthContext);
    const { id } = useAppContext();
    
    const [users, setUsers] = useState([]);   

    useEffect(() => {        
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }        
        try{
            const getUsers = async () => await api.get(`/api/v1/subscriptions_users/${id}`, config)                
            
            getUsers()
                .then((response) => {
                                        
                    let usersList = response.data.map((user) => {                        
                        return [user["id"], `${user["first_name"]} ${user["last_name"]}`, "100%"]
                    })                    
                    setUsers(usersList)    
                })            
            
        }catch(err) {
            console.log(err)
        }

    }, [token, setUsers, id])

    return(
        <React.Fragment>            
           <ListEntity
                list={users}
                type="details"              
                columns={['ID', 'Aluno', 'Frequência']}
                details_path={"/professor/classes/details"}                
            />                       
        </React.Fragment>
    )
}