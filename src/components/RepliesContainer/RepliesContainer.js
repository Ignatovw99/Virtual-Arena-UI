import ReplyButton from "../ReplyButton";
import ReplyList from "../ReplyList";

import styles from "./RepliesContainer.module.css";

const RepliesContainer = ({
    replies
}) => {
    return (
        <div className={styles["replies-container"]}>
            <ReplyButton repliesCount={replies.length} />
            <ReplyList replies={replies} />
        </div>
    );
};

export default RepliesContainer;
