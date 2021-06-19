import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateSubscription() {   
    return (
        <React.Fragment>
            <BaseForm 
                type={'create'}
                entity={'Inscrição'}
                fields={[
                    {"name": "class", "label": "Turma"},
                    {"name": "student", "label": "Aluno"}                    
                ]}
            />
        </React.Fragment>
    );
}