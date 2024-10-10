import React, { createContext, useState, useEffect } from 'react';
import { getSessionToken, getUserData } from '../../utils/sessionManager.js';

const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        updateSessionState();
    }, []);

    const updateSessionState = () => {

        console.log(getSessionToken());
        console.log(getUserData());
        if (getSessionToken()) {
            setUserData(getUserData());
            setIsAuthenticated(true);
        }
    }

    return (
        <SessionContext.Provider value={{ userData, isAuthenticated, updateSessionState }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => React.useContext(SessionContext);