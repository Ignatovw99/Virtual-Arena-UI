import { useState, useEffect } from "react";

import EventItem from "../EventItem";
import LoadingSpinner from "../LoadingSpinner";
import { ErrorAlert } from "../Alert";
import useEventDetailsApi from "../../hooks/useEventDetailsApi";
import { useAlert } from "../../hooks/useAlert";

import styles from "./EventsCatalog.module.css";

const EventsCatalog = () => {
    const [events, setEvents] = useState([]);
    const { getAllEventsDetails, loading } = useEventDetailsApi();
    const { alert, showAlert } = useAlert();

    useEffect(() => {
        loadEventsDetails();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    const loadEventsDetails = async () => {
        try {
            const eventsDetails = await getAllEventsDetails();
            setEvents(eventsDetails);
        } catch (error) {
            showAlert(ErrorAlert, error.message);
        }
    };

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
