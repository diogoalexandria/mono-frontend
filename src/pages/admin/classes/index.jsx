import React from 'react';
import ListEntity from '../../../components/list';

export default function Classes() {
    return(
        <React.Fragment>            
           <ListEntity entity={"Turma"} columns={['ID', 'Matéria', 'Professor', 'Status']}></ListEntity>                       
        </React.Fragment>
    )
}