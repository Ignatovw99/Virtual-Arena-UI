import { useEffect, useState } from "react";

import LoadingSpinner from "../LoadingSpinner";
import { ErrorAlert } from "../Alert";
import useEventDetailsApi from "../../hooks/useEventDetailsApi";
import { useAlert } from "../../hooks/useAlert";

import { formatDate } from "../../utils";
import { getEventCategoryLabel, getEventImageUrl } from "../../utils/event";

import styles from "./EventOverview.module.css";

const EventOverview = () => {
    const [event, setEvent] = useState({});
    const { getEventDetails, loading } = useEventDetailsApi();
    const { alert, showAlert } = useAlert();

    useEffect(() => {
        loadEventDetails();
        // eslint-disable-next-line
    }, []);

    const loadEventDetails = async () => {
        try {
            const eventDetails = await getEventDetails(7);
            setEvent(eventDetails);
        } catch (error) {
            showAlert(ErrorAlert, error.message);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const organizer = event.organizer;

    return (
        <>
            {alert}
            <div className={styles["overview-wrapper"]}>
                <div className={styles["overview-container"]}>
                    <div className={styles["event-image-container"]}>
                        <img
                            className={styles["event-image"]}
                            src={getEventImageUrl(event.imageUrl)}
                            alt={event.title}
                        />
                    </div>
                    <div className={styles["overview-content-container"]}>
                        <p className={styles.topic}>
                            Category <br /> {getEventCategoryLabel(event.category)}
                        </p>
                        <div className={styles["organizer-container"]}>
                            <img
                                className={styles["organizer-image"]}
                                src={organizer && organizer.profilePicture}
                                alt={organizer && organizer.fullName}
                            />
                            <p className={styles["organizer-name"]}>
                                Organizer - {organizer && organizer.fullName}
                            </p>
                        </div>
                        <p className={`${styles.status} ${styles.ongoing}`}>
                            Ongoing
                        </p>
                        <p className={styles["start-date-time"]}>
                            Start: {formatDate(event.startDateTime, "DD.MM.YYYY, HH:mm")}
                        </p>
                        <p className={styles["participants-count"]}>
                            Participants: 176
                        </p>
                        <p className={styles.description}>
                            {event.description}
                        </p>
                    </div>
                </div>
                <div className={styles["event-buttons-container"]}>
                    <button>Participate</button>
                </div>
            </div>
        </>
    );
};

export default EventOverview;
