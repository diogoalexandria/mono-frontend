import React from 'react';
import ListEntity from '../../../components/list';

export default function ProfessorClasses() {
    return(
        <React.Fragment>            
           <ListEntity 
                entity={"Turma"}
                columns={['ID', 'Matéria', 'Período', 'Status']}
                details_path={"/professor/classes/details"}                
            />                       
        </React.Fragment>
    )
}