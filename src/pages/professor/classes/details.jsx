import React from 'react';
import ListEntity from '../../../components/list';

export default function ProfessorClassesDetails() {
    return(
        <React.Fragment>            
           <ListEntity
                type="details"              
                columns={['ID', 'Aluno', 'Frequência']}
                details_path={"/professor/classes/details"}                
            />                       
        </React.Fragment>
    )
}