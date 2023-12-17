import { NavLink, useParams } from "react-router-dom";

import EventParticipantChecker from "../../security/EventParticipantChecker";

import useUnreadQuestionsCount from "./hooks/useUnreadQuestionsTracker";

import styles from "./EventTabBar.module.css";

const EventTabBar = () => {
    const { eventId } = useParams();
    const { getUnreadQuestionsCount, markAllQuestionsAsRead } = useUnreadQuestionsCount();

    return (
        <div className={styles["tab-bar"]}>
            <NavLink
                to={`/events/${eventId}`}
                end
                className={({ isActive }) => isActive ? styles.selected : ""}
            >
                Overview
            </NavLink>

            <EventParticipantChecker>
                <NavLink
                    to={`/events/${eventId}/questions-and-answers`}
                    className={({ isActive }) => isActive ? styles.selected : ""}
                    children={({ isActive }) => {
                        const elements = [<span key="label">Q&A</span>];

                        if (!isActive) {
                            const unreadQuestionsCount = getUnreadQuestionsCount();
                            if (unreadQuestionsCount) {
                                elements.push(<span key="badge" className={styles["unread-questions-count-badge"]}>{unreadQuestionsCount}</span>);
                            }
                        } else {
                            markAllQuestionsAsRead();
                        }
                        return (
                            <>
                                {elements}
                            </>
                        );
                    }}
                />
            </EventParticipantChecker>
        </div>
    );
};

export default EventTabBar;
