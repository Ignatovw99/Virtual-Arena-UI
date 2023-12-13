import { createContext, useContext, useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";

import useEventParticipantsApi from "../hooks/api/useEventParticipantsApi";
import { useWebSocketConnectionContext } from "./WebSocketConnectionContext";
import useEventParticipantsWebSocket from "../hooks/websocket/useEventParticipantsWebSocket";

import { CONTEXT_NOT_FOUND } from "../constants/common";

export const EventContext = createContext();

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export const EventContextProvider = ({
    children
}) => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getAllEventParticipants, alert } = useEventParticipantsApi({ includeAlert: true });

    const { webSocketClient } = useWebSocketConnectionContext();
    const { subscribeForEventParticipant } = useEventParticipantsWebSocket(webSocketClient);

    useEffect(() => {
        getAllEventParticipants(7)
            .then(eventParticipants => {
                setParticipants(eventParticipants);
                setLoading(false);
                subscribeForEventParticipant(7, addEventParticipant);
            })
            .catch(() => {
                setLoading(false);
            });
            
        // eslint-disable-next-line 
    }, []);

    const addEventParticipant = (participant) => setParticipants(state => [...state, participant]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <EventContext.Provider value={{
            participants
        }}>
            {alert}
            {children}
        </EventContext.Provider>
    );
};
