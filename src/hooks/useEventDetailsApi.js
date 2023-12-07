import { useState } from "react";

import { ErrorAlert } from "../components/Alert";
import useEventApi from "./useEventApi";
import useUserApi from "./useUserApi";
import { useAlert } from "./useAlert";

const useEventDetailsApi = () => {
    const [loading, setLoading] = useState(false);
    const { alert, showAlert } = useAlert();
    const { getAllEvents, getEventById } = useEventApi();
    const { getUserProfileById } = useUserApi();

    const getAllEventsDetails = async () => {
        try {
            setLoading(true);

            const events = await getAllEvents();
            const organizers = await Promise.all(
                events.map(event => getUserProfileById(event.organizerId))
            );

            return events.map((event, index) => createEventDetails(event, organizers[index]));
        } catch (error) {
            showAlert(ErrorAlert, error.message);
        } finally {
            setLoading(false);
        }
    };

    const getEventDetails = async (id) => {
        try {
            setLoading(true);

            const event = await getEventById(id);
            const organizer = await getUserProfileById(event.organizerId);
            return createEventDetails(event, organizer);
        } catch (error) {
            showAlert(ErrorAlert, error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        getAllEventsDetails,
        getEventDetails,
        loading,
        alert
    };
};

const createEventDetails = (event, organizer) => ({
    ...event,
    organizer
});

export default useEventDetailsApi;
