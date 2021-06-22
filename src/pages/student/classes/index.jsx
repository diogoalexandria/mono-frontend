import React from 'react';
import ListEntity from '../../../components/list';

export default function StudentClasses() {
    return(
        <React.Fragment>            
           <ListEntity 
                entity={"Turma"}
                columns={['ID', 'Matéria', 'Período', 'Status']}
                details_path={"/student/classes/topics"}                
            />                       
        </React.Fragment>
    )
}