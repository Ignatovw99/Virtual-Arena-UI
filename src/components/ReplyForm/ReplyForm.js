import CreatePost from "../CreatePost";

import { useWebSocketConnectionContext } from "../../contexts/WebSocketConnectionContext";
import useReplyWebSocket from "../../hooks/websocket/useReplyWebSocket";

import styles from "./ReplyForm.module.css";

const ReplyForm = ({
    question
}) => {
    const { webSocketClient } = useWebSocketConnectionContext();
    const { sendReply } = useReplyWebSocket(webSocketClient);

    const replyToQuestion = (content) => sendReply(question.eventId, question.id, content);
    
    return (
        <div className={styles["reply-form-container"]}>
            <p className={styles["reply-form-title"]}>
                Reply to Question
            </p>
            <CreatePost
                createPost={replyToQuestion}
                buttonLabel="Reply"
            />
        </div>
    );
};

export default ReplyForm;
