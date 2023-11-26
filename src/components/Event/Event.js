import EventTabBar from "../EventTabBar";
import EventOverview from "../EventOverview";
import PollsRegistry from "../PollsRegistry";
import QuestionAnswerSection from "../QuestionAnswerSection";

import styles from "./Event.module.css";

const Event = () => {
    return (
        <section className={styles["event-section"]}>
            <h2 className={styles.title}>
                Event Title
            </h2>
            <EventTabBar />
            <EventOverview />
            <PollsRegistry />
            <QuestionAnswerSection />
        </section>
    );
};

export default Event;
