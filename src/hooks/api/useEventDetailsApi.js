import { useState } from "react";

import useEventApi from "./useEventApi";
import useUserApi from "./useUserApi";

const useEventDetailsApi = (requestConfiguration = {}) => {
    const [loading, setLoading] = useState(requestConfiguration.initalLoading || false);
    const { getAllEvents, getEventById } = useEventApi();
    const { getUserProfileById } = useUserApi();

    const getAllEventsDetails = async () => {
        try {
            setLoading(true);
            const events = await getAllEvents();
            const organizers = await Promise.all(
                events.map(event => getUserProfileById(event.organizerId))
            );
            return events.map((event, index) => createDetailedEvent(event, organizers[index]));
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getEventDetails = async (id) => {
        try {
            setLoading(true);
            const event = await getEventById(id);
            const organizer = await getUserProfileById(event.organizerId);
            return createDetailedEvent(event, organizer);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        getAllEventsDetails,
        getEventDetails,
        loading
    };
};

const createDetailedEvent = (event, organizer) => ({
    ...event,
    organizer
});

export default useEventDetailsApi;
