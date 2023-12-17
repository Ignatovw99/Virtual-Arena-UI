import { useContext } from "react";

import EventContext from "../EventContext";

import { CONTEXT_NOT_FOUND } from "../../../constants/common";

const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export default useEventContext;
