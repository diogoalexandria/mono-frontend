import React from 'react';
import BaseForm from '../../../components/baseForm';


export default function CreateCourse() {
    function initialState() {
        return {
            "name": "",            
        }
    }

    return (
        <React.Fragment>
            <BaseForm
                type={'create'}
                entity={'Curso'}
                fields={[{ "name": "name", "label": "Nome" }]}
                initial_state={initialState}
                api_path={"/api/v1/courses"}
                return_path={"/admin/courses"}
            />
        </React.Fragment>
    );
}