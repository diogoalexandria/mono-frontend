import React from 'react';
import ListEntity from '../../../components/list';

export default function Subscriptions() {
    return(        
        <React.Fragment>            
            <ListEntity
                identity={"administrator"}
                entity={"Inscrições"}
                columns={['ID', 'Materia', 'Aluno', 'Período', 'Status']}
                create_path={"/admin/subscriptions/create"}
                update_path={"/admin/subscriptions/update"}
            />            
        </React.Fragment>
    )
}