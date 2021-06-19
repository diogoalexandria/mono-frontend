import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateClasses() {   
    return (
        <React.Fragment>
            <BaseForm 
                type={'create'}
                entity={'Turma'}
                fields={[
                    {"name": "subject", "label": "Matéria"},
                    {"name": "professor", "label": "Professor"},
                    {"name": "period", "label": "Período"}
                ]}
            />
        </React.Fragment>
    );
}