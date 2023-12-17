import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import EventContext from "./EventContext";

import useEventDetailsApi from "../../hooks/api/useEventDetailsApi";
import useEventParticipantsApi from "../../hooks/api/useEventParticipantsApi";
import useUserApi from "../../hooks/api/useUserApi";

import useEventParticipantsWebSocket from "../../hooks/websocket/useEventParticipantsWebSocket";
import { useWebSocketConnectionContext } from "../WebSocketConnectionContext";

const EventContextProvider = ({
    children
}) => {
    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [organizer, setOrganizer] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { eventId } = useParams();

    const { getEventDetails } = useEventDetailsApi();
    const { getUserProfileById } = useUserApi();
    const { getAllEventParticipants } = useEventParticipantsApi();

    const { webSocketClient } = useWebSocketConnectionContext();
    const { subscribeForEventParticipant } = useEventParticipantsWebSocket(webSocketClient);

    useEffect(() => {
        Promise.all([getEventDetails(eventId), getAllEventParticipants(eventId)])
            .then(([event, participants]) => {
                setEvent(event);
                setParticipants(participants);

                subscribeForEventParticipant(eventId, addEventParticipant);
                return getUserProfileById(event.organizerId);
            })
            .then(organizer => setOrganizer(organizer))
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
            organizer,
            loading,
            error
        }}>
            {children}
        </EventContext.Provider>
    );
};

export default EventContextProvider;
