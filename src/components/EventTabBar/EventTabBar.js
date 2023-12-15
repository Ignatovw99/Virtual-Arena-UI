import { NavLink, useParams } from "react-router-dom";

import styles from "./EventTabBar.module.css";

const EventTabBar = () => {
    const { eventId } = useParams();

    return (
        <div className={styles["tab-bar"]}>
            <NavLink
                to={`/events/${eventId}`}
                end
                className={({ isActive }) => isActive ? styles.selected : ""}
            >
                Overview
            </NavLink>

            <NavLink
                to={`/events/${eventId}/questions-and-answers`}
                className={({ isActive }) => isActive ? styles.selected : ""}
            >
                Q&A
            </NavLink>
        </div>
    );
};

export default EventTabBar;
