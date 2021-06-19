import React from 'react';
import ListEntity from '../../../components/list';

export default function Classes() {
    return(
        <React.Fragment>            
           <ListEntity
                identity={"administrator"} 
                entity={"Turma"}
                columns={['ID', 'Matéria', 'Professor', 'Período', 'Status']}
                create_path={"/admin/classes/create"}
                update_path={"/admin/classes/update"}
            />                       
        </React.Fragment>
    )
}