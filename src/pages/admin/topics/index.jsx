import React from 'react';
import ListEntity from '../../../components/list';

export default function Topics() {
    return(        
        <React.Fragment>            
            <ListEntity
                entity={"Aulas"}
                columns={['ID', 'Materia', 'Turma', 'Professor', 'Data', 'Status']}
                create_path={"/admin/topics/create"}
                update_path={"/admin/topics/update"}
            />            
        </React.Fragment>
    )
}