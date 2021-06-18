import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function UpdateCourse() {   
    return (
        <React.Fragment>
            <BaseForm type={'update'} entity={'Curso'}/>
        </React.Fragment>
    );
}