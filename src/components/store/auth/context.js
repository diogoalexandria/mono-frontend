import { createContext } from "react";

const AuthContext = createContext({
    token: null,
    setToken: () => {},
    entity: null,
    setEntity: () => {},   
});

export default AuthContext;