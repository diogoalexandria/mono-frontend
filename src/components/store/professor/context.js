import { createContext, useContext } from 'react';

const ProfessorContext = createContext();

export function useProfessorContext() {
    const context = useContext(ProfessorContext)
    const { entities, setEntities } = context;
    return { entities, setEntities }
}

export default ProfessorContext