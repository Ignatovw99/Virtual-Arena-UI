import ReplyButton from "../ReplyButton";
import ReplyList from "../ReplyList";
import ReplyForm from "../ReplyForm";

import styles from "./RepliesContainer.module.css";

const RepliesContainer = ({
    replies,
    question
}) => {
    return (
        <div className={styles["replies-container"]}>
            <ReplyButton repliesCount={replies.length} />
            <div className={styles.content}>
                <ReplyList replies={replies} />
                <ReplyForm question={question} />
            </div>
        </div>
    );
};

export default RepliesContainer;
