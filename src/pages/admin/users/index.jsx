import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function Users() {    
    const { token } = useContext(AuthContext);
    const { setResponse } = useAppContext();
    const [users, setUsers] = useState([]);   

    useEffect(() => {        
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }        
        try{
            const getUsers = async () => await api.get("/api/v1/users", config)                
            
            getUsers()
                .then((response) => {                    
                    let usersList = response.data.map((user) => {                        
                        return [user["id"], `${user["first_name"]} ${user["last_name"]}`, user["entity"], user["status"]]
                    })                    
                    setUsers(usersList)
                    setResponse(response.data)
                })            
            
        }catch(err) {
            console.log(err)
        }

    }, [token, setUsers, setResponse])

    return (
        <React.Fragment>
            <ListEntity
                list={users}                
                identity={"administrator"}
                entity={"Usuário"}
                columns={['ID', 'Nome', 'Função', 'Status']}
                create_path={"/admin/users/create"}
                update_path={"/admin/users/update"}
                api_path={"/api/v1/users/"}
            />
        </React.Fragment>
    )
}