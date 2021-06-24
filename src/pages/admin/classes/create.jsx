import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateClasses() {
    function initialState() {
        return {
            "name": "",            
        }
    }    
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
                initial_state={initialState}
                api_path={"/api/v1/subjects"}
                return_path={"/admin/subjects"}
            />
        </React.Fragment>
    );
}