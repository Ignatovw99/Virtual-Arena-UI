import { useContext } from "react";

import WebSocketConnectionContext from "../WebSocketConnectionContext";

import { CONTEXT_NOT_FOUND } from "../../../constants/common";

const useWebSocketConnectionContext = () => {
    const context = useContext(WebSocketConnectionContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export default useWebSocketConnectionContext;
