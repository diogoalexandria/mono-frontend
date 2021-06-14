import { createContext } from "react";

const storeContext = createContext({
    token: null,
    setToken: () => {},
    entity: null,
    setEntity: () => {}
});

export default storeContext;