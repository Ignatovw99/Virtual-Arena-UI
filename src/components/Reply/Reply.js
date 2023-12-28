import Post from "../Post";

import styles from "./Reply.module.css";

const Reply = ({
    reply
}) => {
    return (
        <div className={styles["reply-container"]}>
            <Post
                content={reply.content}
                sender={reply.sender}
                timestamp={reply.timestamp}
                likes={reply.likes}
            // likePost={() => likeQuestion(question.eventId, question.id)}
            />
        </div>
    );
};

export default Reply;
