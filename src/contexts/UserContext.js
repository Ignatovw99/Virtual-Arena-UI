import { createContext, useContext } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import useAuthenticatedUserApi from "./hooks/useAuthenticatedUserApi";

import { CONTEXT_NOT_FOUND } from "../constants/common";

export const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export const UserProvider = ({
    children
}) => {
    const { user, loading, alert } = useAuthenticatedUserApi();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated: !!user
        }}>
            {alert}
            {children}
        </UserContext.Provider>
    );
};
