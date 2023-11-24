import EventItem from "../EventItem";

import styles from "./EventsCatalog.module.css";

const EventsCatalog = () => {
    return (
        <section className={styles["events-catalog-section"]}>
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
        </section>
    );
};

export default EventsCatalog;
