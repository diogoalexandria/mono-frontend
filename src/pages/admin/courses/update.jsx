import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateCourse() {   
    return (
        <React.Fragment>
            <BaseForm type={'update-switch'} entity={'Curso'} fields={[{"name": "name", "label": "Nome"}]}/>
        </React.Fragment>
    );
}