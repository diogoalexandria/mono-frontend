import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateSubject() {
    function initialState() {
        return {
            "name": "",            
        }
    }

    return (
        <React.Fragment>
            <BaseForm
                type={'create'}
                entity={'Matéria'}
                fields={[{"name": "name", "label": "Nome"}]}
                initial_state={initialState}
                api_path={"/api/v1/subjects"}
                return_path={"/admin/subjects"}
            />
        </React.Fragment>
    );
}