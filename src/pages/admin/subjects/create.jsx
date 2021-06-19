import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateSubject() {   
    return (
        <React.Fragment>
            <BaseForm type={'create'} entity={'Matéria'} fields={[{"name": "name", "label": "Nome"}]}/>
        </React.Fragment>
    );
}