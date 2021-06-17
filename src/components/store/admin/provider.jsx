import { useState } from "react";
import AdminContext from "./context";

function AdminProvider({children}) {
    const [entities, setEntities] = useState([
        {
            text: {
                plural: 'Usuários',
                singular: 'Usuário'
            },
            path: '/admin/users'
        },
        {
            text: {
                plural: 'Cursos',
                singular: 'Curso'
            },
            path: '/admin/courses'
        },
        {
            text: {
                plural: 'Matérias',
                singular: 'Matéria'
            },
            path: '/admin/subjects'
        },
        {
            text: {
                plural: 'Turmas',
                singular: 'Turma'
            },
            path: '/admin/classes',
        },
        {
            text: {
                plural: 'Inscrições',
                singular: 'Inscrição'
            },
            path: '/admin/subscriptions'
        },
        {
            text: {
                plural: 'Aulas',
                singular: 'Aulas'
            },
            path: '/admin/topics'
        }
    ])

    return (
        <AdminContext.Provider
            value={{
                entities,
                setEntities
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider

