import React from 'react';
import ListEntity from '../../../components/list';

export default function StudentClassesTopics() {
    return(
        <React.Fragment>            
           <ListEntity 
                entity={"Aula"}
                columns={['ID', 'Turma', 'Matéria', 'Período', 'Status']}
                details_path={"/student/classes/topics/presences"}                
            />                       
        </React.Fragment>
    )
}