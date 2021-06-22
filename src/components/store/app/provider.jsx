import React from "react";
import Context from "./context";
import { useState } from "react";

const AppProvider = ({ children }) => {    
    const [response, setResponse] = useState([])
    const [id, setId] = useState("")    

    return(
       <Context.Provider
        value={
            {                
                response,
                setResponse,
                id,
                setId   
            }
        }
       >
           {children}
       </Context.Provider>
    );
}

export default AppProvider;