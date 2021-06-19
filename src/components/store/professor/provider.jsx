import { useState } from "react";
import ProfessorContext from "./context";

function ProfessorProvider({children}) {
    const [entities, setEntities] = useState([       
        {
            text: {
                plural: 'Turmas',
                singular: 'Turma'
            },
            path: '/professor/classes',
        },
        {
            text: {
                plural: 'Aulas',
                singular: 'Aula'
            },
            path: '/professor/topics',
        }           
    ])

    return (
        <ProfessorContext.Provider
            value={{
                entities,
                setEntities
            }}
        >
            {children}
        </ProfessorContext.Provider>
    )
}

export default ProfessorProvider