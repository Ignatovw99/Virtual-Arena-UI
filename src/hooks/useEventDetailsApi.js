import { useState } from "react";

import useEventApi from "./useEventApi";
import useUserApi from "./useUserApi";

const useEventDetailsApi = () => {
    const [loading, setLoading] = useState(false);
    const { getAllEvents, getEventById } = useEventApi();
    const { getUserProfileById } = useUserApi();

    const getAllEventsDetails = async () => {
        setLoading(true);
        const events = await getAllEvents();

        const organizers = await Promise.all(
            events.map(event => getUserProfileById(event.organizerId))
        );

        const eventsDetails = events.map((event, index) => createEventDetails(event, organizers[index]));

        setLoading(false);
        return eventsDetails;
    };

    const getEventDetails = async (id) => {
        setLoading(true);
        const event = await getEventById(id);
        const organizer = await getUserProfileById(event.organizerId);
        const eventDetails = createEventDetails(event, organizer);
        setLoading(false);
        return eventDetails;
    };

    return { getAllEventsDetails, getEventDetails, loading };
};

const createEventDetails = (event, organizer) => ({
    ...event,
    organizer
});

export default useEventDetailsApi;
