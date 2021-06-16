import { createContext, useContext } from 'react';

const AdminContext = createContext();

export function useAdminContext() {
    const context = useContext(AdminContext)
    const { entities, setEntities } = context;
    return { entities, setEntities }
}

export default AdminContext