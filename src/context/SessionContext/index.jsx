import React, { createContext, useState, useEffect } from 'react';
import { verifyLogin } from '../../utils/sessionManager.js';

const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        updateSessionState();
    }, []);

    const updateSessionState = async () => {
        try {
            const apiResponse = await verifyLogin();  // Esperar a que verifyLogin() resuelva la promesa
            setUserData(apiResponse.data);
            setIsAuthenticated(apiResponse.result);
        } catch (error) {
            console.error("Error updating session state:", error);
            setUserData({});
            setIsAuthenticated(false);
        }
    };

    return (
        <SessionContext.Provider value={{ userData, isAuthenticated, updateSessionState }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => React.useContext(SessionContext);