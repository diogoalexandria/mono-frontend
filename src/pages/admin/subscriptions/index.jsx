import React from 'react';
import ListEntity from '../../../components/list';

export default function Subscriptions() {
    return(        
        <React.Fragment>            
            <ListEntity
                entity={"Inscrições"}
                columns={['ID', 'Materia', 'Aluno', 'Período', 'Status']}
                create_path={"/admin/subscription/create"}
                update_path={"/admin/subscription/update"}
            />            
        </React.Fragment>
    )
}