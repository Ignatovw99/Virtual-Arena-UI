import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { EventContext } from "./EventContext";

import useEventDetailsApi from "../../hooks/api/useEventDetailsApi";
import useEventParticipantsApi from "../../hooks/api/useEventParticipantsApi";
import useEventParticipantsWebSocket from "../../hooks/websocket/useEventParticipantsWebSocket";
import { useWebSocketConnectionContext } from "../WebSocketConnectionContext";

export const EventContextProvider = ({
    children
}) => {
    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { eventId } = useParams();

    const { getEventDetails } = useEventDetailsApi();
    const { getAllEventParticipants } = useEventParticipantsApi();

    const { webSocketClient } = useWebSocketConnectionContext();
    const { subscribeForEventParticipant } = useEventParticipantsWebSocket(webSocketClient);

    useEffect(() => {
        Promise.all([getEventDetails(eventId), getAllEventParticipants(eventId)])
            .then(([event, participants]) => {
                setEvent(event);
                setParticipants(participants);

                subscribeForEventParticipant(eventId, addEventParticipant);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setLoading(false));

        // eslint-disable-next-line 
    }, []);

    const addEventParticipant = (participant) => setParticipants(state => [...state, participant]);

    return (
        <EventContext.Provider value={{
            event,
            participants,
            loading,
            error
        }}>
            {children}
        </EventContext.Provider>
    );
};
