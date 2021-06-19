import { createContext, useContext } from 'react';

const StudentContext = createContext();

export function useStudentContext() {
    const context = useContext(StudentContext)
    const { entities, setEntities } = context;
    return { entities, setEntities }
}

export default StudentContext