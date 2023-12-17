import { useWebSocketConnectionContext } from "../../contexts/WebSocketConnectionContext";
import useQuestionWebSocket from "../../hooks/websocket/useQuestionWebSocket";
import Post from "../Post";

import styles from "./Question.module.css";

const Question = ({
    question
}) => {
    const { webSocketClient } = useWebSocketConnectionContext();
    const { likeQuestion } = useQuestionWebSocket(webSocketClient);

    return (
        <div className={styles["question-container"]}>
            <Post
                content={question.content}
                sender={question.sender}
                timestamp={question.timestamp}
                likes={question.likes}
                likePost={() => likeQuestion(question.eventId, question.id)}
            />
        </div>
    );
};

export default Question;
