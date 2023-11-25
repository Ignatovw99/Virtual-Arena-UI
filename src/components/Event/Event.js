import EventTabBar from "../EventTabBar";
import EventOverview from "../EventOverview";
import PollsList from "../PollsList";

import styles from "./Event.module.css";

const Event = () => {
    return (
        <section className={styles["event-section"]}>
            <h2 className={styles.title}>
                Event Title
            </h2>
            <EventTabBar />
            <EventOverview />
            <PollsList />
        </section>
    );
};

export default Event;
