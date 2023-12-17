import { useState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import CreatePost from "../CreatePost";

import useQuestionWebSocket from "../../hooks/websocket/useQuestionWebSocket";
import { useWebSocketConnectionContext } from "../../contexts/WebSocketConnectionContext";

import styles from "./AskQuestion.module.css";

const AskQuestion = () => {
    const [active, setActive] = useState(false);
    const { eventId } = useParams();

    const { webSocketClient } = useWebSocketConnectionContext();
    const { sendQuestion } = useQuestionWebSocket(webSocketClient);

    const askQuestion = (content) => sendQuestion(eventId, content);

    return (
        <div className={styles["ask-question-container"]}>
            {active &&
                <>
                    <div className={styles["ask-question-header"]}>
                        <h3 className={styles.title}>
                            Ask a Question
                        </h3>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={styles["close-button"]}
                            onClick={() => setActive(false)}
                        />
                    </div>
                    <CreatePost
                        createPost={askQuestion}
                        buttonLabel="Ask"
                    />
                </>
            }

            {!active &&
                <button
                    className={styles["ask-question-button"]}
                    onClick={() => setActive(true)}
                >
                    Ask a Question
                </button>
            }
        </div>
    );
};

export default AskQuestion;
