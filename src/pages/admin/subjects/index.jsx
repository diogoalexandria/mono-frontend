import React from 'react';
import ListEntity from '../../../components/list';

export default function Subjects() {
    return(        
        <React.Fragment>            
            <ListEntity
                entity={"Matéria"}
                columns={['ID', 'Nome', 'Status']}
                create_path={"/admin/subjects/create"}
                update_path={"/admin/subjects/update"}
            />            
        </React.Fragment>
    )
}