import Post from "../Post";

import styles from "./RepliesCollection.module.css";

const RepliesCollection = ({
    content,
    sender,
    timestamp,
    likes,
    likePost
}) => {
    return (
        <div className={styles["replies-container"]}>
            <p className={styles["replies-title"]}>
                Replies
            </p>
            <div className={styles["reply-container"]}>
            <Post
                content={content}
                sender={sender}
                timestamp={timestamp}
                likes={likes}
                // likePost={() => likeQuestion(question.eventId, question.id)}
            />
            </div>
            <div className={styles["reply-container"]}>
            <Post
                content={content}
                sender={sender}
                timestamp={timestamp}
                likes={likes}
                // likePost={() => likeQuestion(question.eventId, question.id)}
            />
            </div>
        </div>
    );
};

export default RepliesCollection;
