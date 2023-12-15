import { useContext } from "react";

import UserContext from "../UserContext";

import { CONTEXT_NOT_FOUND } from "../../../constants/common";

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export default useUserContext;
