import Message from "../Message";

import styles from "./RepliesCollection.module.css";

const RepliesCollection = () => {
    return (
        <div className={styles["replies-container"]}>
            <p className={styles["replies-title"]}>
                Replies
            </p>
            <div className={styles["reply-container"]}>
                <Message />
            </div>
            <div className={styles["reply-container"]}>
                <Message />
            </div>
        </div>
    );
};

export default RepliesCollection;
