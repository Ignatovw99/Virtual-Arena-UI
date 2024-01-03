import { useState } from "react";

import ReplyButton from "../ReplyButton";
import ReplyList from "../ReplyList";
import ReplyForm from "../ReplyForm";

import styles from "./RepliesContainer.module.css";

const RepliesContainer = ({
    replies,
    question
}) => {
    const [showReplies, setShowReplies] = useState(false);

    return (
        <div className={styles["replies-container"]}>
            <ReplyButton
                repliesCount={replies.length}
                toggleRepliesContent={() => setShowReplies(state => !state)}
            />
            {showReplies &&
                <div className={styles.content}>
                    <ReplyList replies={replies} />
                    <ReplyForm question={question} />
                </div>
            }
        </div>
    );
};

export default RepliesContainer;
