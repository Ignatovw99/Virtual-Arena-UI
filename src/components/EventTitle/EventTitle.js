import { useEventContext } from "../../contexts/EventContext";

import styles from "./EventTitle.module.css";

const EventTitle = () => {
    const { event } = useEventContext();

    return (
        <h2 className={styles.title}>
            {event.title}
        </h2>
    );
};

export default EventTitle;
