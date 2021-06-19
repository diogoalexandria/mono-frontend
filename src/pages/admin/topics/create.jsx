import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateTopic() {   
    return (
        <React.Fragment>
            <BaseForm 
                type={'create'}
                entity={'Aulas'}
                fields={[
                    {"name": "class", "label": "Turma"},                    
                ]}
                is_topic={true}
            />
        </React.Fragment>
    );
}