import React from 'react';
import ListEntity from '../../../components/list';

export default function Courses() {
    return(        
        <React.Fragment>            
            <ListEntity
                entity={"Curso"}
                columns={['ID', 'Nome', 'Status']}
                create_path={"/admin/courses/create"}
                update_path={"/admin/courses/update"}
            />            
        </React.Fragment>
    )
}