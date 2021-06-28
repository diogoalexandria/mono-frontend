import React, { useContext, useEffect, useState } from 'react';
import ListEntity from '../../../components/list';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

export default function Subscriptions() {
    const { token } = useContext(AuthContext);
    const { setResponse } = useAppContext();
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getSubscriptions = async () => await api.get("/api/v1/subscriptions", config)

            getSubscriptions()
                .then((response) => {                    
                    let subscriptionsList = response.data.map((subscription) => [subscription["id"], subscription["class_id"], subscription["student_id"], subscription["created_at"], subscription["status"]])
                    
                    setSubscriptions(subscriptionsList)
                    setResponse(response.data)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setSubscriptions, setResponse])

    return(        
        <React.Fragment>            
            <ListEntity
                list={subscriptions}
                identity={"administrator"}
                entity={"Inscrições"}
                columns={['ID', 'Turma', 'Aluno', 'Data de inscrição', 'Status']}
                create_path={"/admin/subscriptions/create"}
                update_path={"/admin/subscriptions/update"}
                api_path={"/api/v1/subscriptions/"}
            />            
        </React.Fragment>
    )
}