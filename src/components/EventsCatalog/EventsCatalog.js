import { useState, useEffect } from "react";

import EventItem from "../EventItem";
import LoadingSpinner from "../LoadingSpinner";
import { ErrorAlert } from "../Alert";

import useEventDetailsApi from "../../hooks/api/useEventDetailsApi";
import { useAlert } from "../../hooks/useAlert";

import styles from "./EventsCatalog.module.css";

const EventsCatalog = ({
    userId
}) => {
    const [events, setEvents] = useState([]);
    const { getAllEventsDetails, loading } = useEventDetailsApi({ initalLoading: true });
    const { alert, showAlert } = useAlert();

    useEffect(() => {
        loadEventsDetails();

        // eslint-disable-next-line
    }, []);

    const loadEventsDetails = async () => {
        try {
            const eventsDetails = await getAllEventsDetails(userId);
            setEvents(eventsDetails);
        } catch (error) {
            showAlert(ErrorAlert, error.message);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {alert}
            <section className={styles["events-catalog-section"]}>
                {events.map(event =>
                    <EventItem
                        key={event.id}
                        {...event}
                    />
                )}
            </section>
        </>
    );
};

export default EventsCatalog;
