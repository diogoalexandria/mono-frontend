import React from "react";
import Context from "./context";
import useStorage from "../../../utils/useStorage"

const AuthProvider = ({ children }) => {
    const [token, setToken] = useStorage('token')
    const [entity, setEntity] = useStorage('entity')    

    return(
       <Context.Provider
        value={
            {
                token,
                setToken,
                entity,
                setEntity    
            }
        }
       >
           {children}
       </Context.Provider>
    );
}

export default AuthProvider;