import React from 'react';
import ListEntity from '../../../components/list';

export default function Users() {
    return (
        <React.Fragment>            
            <ListEntity
                entity={"Usuário"}
                columns={['ID', 'Nome', 'Função', 'Status']}
                create_path={"/admin/users/create"}
                update_path={"/admin/users/update"}
            />            
        </React.Fragment>
    )
}