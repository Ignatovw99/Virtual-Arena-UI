import Post from "../Post";

import styles from "./Question.module.css";

const Question = ({
    question
}) => {
    return (
        <div className={styles["question-container"]}>
            <Post
                content={question.content}
                sender={question.sender}
                timestamp={question.timestamp}
            />
            <button className={styles["show-replies-button"]}>
                Show Replies
            </button>
        </div>
    );
};

export default Question;
