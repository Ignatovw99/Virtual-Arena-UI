import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils";
import { getEventImageUrl, getEventCategoryLabel } from "../../utils/event";

import styles from "./EventItem.module.css";

const EventItem = ({
    id,
    title,
    imageUrl,
    organizer,
    category,
    startDateTime,
    description
}) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.event}
            onClick={() => navigate(`/events/${id}`)}
        >
            <img
                className={styles.image}
                src={getEventImageUrl(imageUrl)}
                alt={title}
            />
            <div className={styles["event-info-container"]}>
                <p className={`${styles.title} ${styles["text-truncation"]}`}>
                    {title}
                </p>
                <div className={styles["organizer-container"]}>
                    <img
                        className={styles["organizer-image"]}
                        src={organizer.profilePicture}
                        alt={organizer.email}
                    />
                    <p className={`${styles["organizer-name"]} ${styles["text-truncation"]}`}>
                        By {organizer.fullName}
                    </p>
                </div>
                <div className={styles["event-metadata-container"]}>
                    <p className={`${styles.topic} ${styles["text-truncation"]}`}>
                        {getEventCategoryLabel(category)}
                    </p>
                    <p className={styles["start-date-time"]}>
                        Start: {formatDate(startDateTime, "DD.MM.YYYY, HH:mm")}
                    </p>
                </div>
                <div className={styles["description-container"]}>
                    <p className={`${styles.description} ${styles["text-truncation"]}`}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventItem;
