import { useState } from "react";
import StudentContext from "./context";

function StudentProvider({children}) {
    const [entities, setEntities] = useState([       
        {
            text: {
                plural: 'Turmas',
                singular: 'Turma'
            },
            path: '/student/classes',
        }        
    ])

    return (
        <StudentContext.Provider
            value={{
                entities,
                setEntities
            }}
        >
            {children}
        </StudentContext.Provider>
    )
}

export default StudentProvider