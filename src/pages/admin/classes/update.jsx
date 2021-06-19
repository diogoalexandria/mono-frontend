import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateClasses() {   
    return (
        <React.Fragment>
            <BaseForm 
                type={'update-selector'}
                entity={'Turma'}
                fields={[
                    {"name": "class", "label": "Turma"},
                    {"name": "student", "label": "Aluno"}                               
                ]}
                options={["aberta", "em-andamento", "encerrada"]}
            />
        </React.Fragment>
    );
}