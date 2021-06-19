import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateTopic() {   
    return (
        <React.Fragment>
            <BaseForm 
                type={'update-selector'}
                entity={'Aulas'}
                fields={[
                    {"name": "class", "label": "Turma"},                    
                ]}
                options={["aberta", "dada", "cancelada", "adiada"]}
                is_topic={true}
            />
        </React.Fragment>
    );
}