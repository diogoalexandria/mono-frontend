import React from 'react';
import BaseForm from '../../../components/baseForm';

export default function CreateCourse() {   
    return (
        <React.Fragment>
            <BaseForm type={'create'} entity={'Curso'}/>
        </React.Fragment>
    );
}