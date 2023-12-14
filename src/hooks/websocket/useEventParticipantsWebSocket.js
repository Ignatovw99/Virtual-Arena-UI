import { executeWithConnectedClient } from "../../utils/websocket";

const useEventParticipantsWebSocket = (client) => {

    const subscribeForEventParticipant = (eventId, handleEventParticipant) => {
        
        const subscribeForEventParticipantHandler = () => {
            client.subscribe(`/topic/events/${eventId}/participants`, (participantFrame) => {
                const participant = JSON.parse(participantFrame.body);
                handleEventParticipant(participant);
            });
        };

        executeWithConnectedClient(client, subscribeForEventParticipantHandler);
    };

    return { subscribeForEventParticipant };
};

export default useEventParticipantsWebSocket;
