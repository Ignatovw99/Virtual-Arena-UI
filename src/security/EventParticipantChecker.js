import { Navigate } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";
import { useEventContext } from "../contexts/EventContext";

const EventParticipantChecker = ({ 
    children,
    redirect,
    negate
}) => {
    const { user } = useUserContext();
    const { event, participants } = useEventContext();

    const isParticipantInEvent = () => {
        if (!(user && event)) {
            return false;
        }
    
        const isEventOrganizer = user.id === event.organizerId;
        if (isEventOrganizer) {
            return true;
        }
    
        const isParticipant = participants.some(participant => participant.id === user.id);
        if (isParticipant) {
            return true;
        }
    
        return false;
    };

    let isParticipant = isParticipantInEvent();

    if (negate) {
        isParticipant = !isParticipant;
    }

    if (isParticipant) {
        return children;
    } else if (redirect) {
        const redirectTo = event.id ? `/events/${event.id}` : "/";
        return <Navigate to={redirectTo} replace />;
    } else {
        return null;
    }
};

export default EventParticipantChecker;
