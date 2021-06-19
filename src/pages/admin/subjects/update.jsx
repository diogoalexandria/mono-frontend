import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateSubject() {   
    return (
        <React.Fragment>
            <BaseForm type={'update-switch'} entity={'Matéria'} fields={[{"name": "name", "label": "Nome"}]}/>
        </React.Fragment>
    );
}