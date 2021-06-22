import React from 'react';
import ListEntity from '../../../components/list';

export default function ProfessorTopics() {
    return(
        <React.Fragment>            
           <ListEntity 
                entity={"Aula"}
                columns={['ID', 'Turma', 'Matéria', 'Data', 'Status']}
                details_path={"/professor/topics/details"}                
            />                       
        </React.Fragment>
    )
}