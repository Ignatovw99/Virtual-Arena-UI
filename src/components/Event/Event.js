import { Outlet } from "react-router-dom";

import EventTabBar from "../EventTabBar";

import styles from "./Event.module.css";
import { useEventContext } from "../../contexts/EventContext";

const Event = () => {
    const { event } = useEventContext();

    return (
        <section className={styles["event-section"]}>
            <h2 className={styles.title}>
                {event.title}
            </h2>
            <EventTabBar />
            <Outlet />
        </section>
    );
};

export default Event;
