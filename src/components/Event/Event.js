import EventTabBar from "../EventTabBar";
import EventOverview from "../EventOverview";
import QuestionAnswerSection from "../QuestionAnswerSection";

import useEventOverviewDataManager from "./hooks/useEventOverviewDataManager";
import useQuestionsAndAnswersDataManager from "./hooks/useQuestionsAndAnswersDataManager";

import styles from "./Event.module.css";

const Event = () => {
    const {
        event,
        loading: eventLoading,
        error: eventError
    } = useEventOverviewDataManager();

    const {
        questions,
        loading: questionsLoading,
        error: questionsError
    } = useQuestionsAndAnswersDataManager();

    return (
        <section className={styles["event-section"]}>
            <h2 className={styles.title}>
                {event.title}
            </h2>
            <EventTabBar />
            <EventOverview
                event={event}
                error={eventError}
                loading={eventLoading}
            />
            <QuestionAnswerSection
                questions={questions}
                error={questionsError}
                loading={questionsLoading}
            />
        </section>
    );
};

export default Event;
