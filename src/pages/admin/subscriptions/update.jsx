import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateSubscription() {   
    return (
        <React.Fragment>
            <BaseForm 
                type={'update-selector'}
                entity={'Inscrição'}
                fields={[
                    {"name": "subject", "label": "Matéria"},
                    {"name": "student", "label": "Aluno"}                               
                ]}
                options={["aberta", "em-andamento", "encerrada"]}
            />
        </React.Fragment>
    );
}