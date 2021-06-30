import { createContext, useContext } from 'react';

const AppContext = createContext();

export function useAppContext() {
    const context = useContext(AppContext)
    
    const { 
        response,
        setResponse,
        id,
        setId,
        idDetails,
        setIdDetails        
    } = context;

    return { response, setResponse, id, setId, idDetails, setIdDetails }
}

export default AppContext