import Message from "../Message";
import RepliesCollection from "../RepliesCollection";

import styles from "./Question.module.css";

const Question = () => {
    return (
        <div className={styles["question-container"]}>
            <Message />
            <button className={styles["show-replies-button"]}>
                Show Replies
            </button>
            <RepliesCollection />
        </div>
    );
};

export default Question;
