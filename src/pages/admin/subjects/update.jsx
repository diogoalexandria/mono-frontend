import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateSubject() {   
    return (
        <React.Fragment>
            <BaseForm type={'update'} entity={'Matéria'}/>
        </React.Fragment>
    );
}