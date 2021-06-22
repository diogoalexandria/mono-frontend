import React from 'react';
import ListEntity from '../../../components/list';

export default function StudentClassesTopicsPresences() {
    return(
        <React.Fragment>            
           <ListEntity
                type="details"              
                columns={['ID', 'Aluno']}
                details_path={"/professor/classes/details"}                
            />                       
        </React.Fragment>
    )
}