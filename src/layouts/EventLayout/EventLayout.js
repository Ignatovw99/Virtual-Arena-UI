import { Outlet } from "react-router-dom";

import EventTitle from "../../components/EventTitle";
import EventTabBar from "../../components/EventTabBar";

import { WebSocketConnectionProvider } from "../../contexts/WebSocketConnectionContext";
import { EventContextProvider } from "../../contexts/EventContext";
import { QuestionAndAnswerProvider } from "../../contexts/QuestionAndAnswerContext";

import styles from "./EventLayout.module.css";

const EventLayout = () => {
    return (
        <section className={styles["event-layout"]}>
            <WebSocketConnectionProvider>
                <EventContextProvider>
                    <QuestionAndAnswerProvider>
                        <EventTitle />
                        <EventTabBar />
                        <Outlet />
                    </QuestionAndAnswerProvider>
                </EventContextProvider>
            </WebSocketConnectionProvider>
        </section>
    );
};

export default EventLayout;
