import Reply from "../Reply";

import styles from "./ReplyList.module.css";

const ReplyList = ({
    replies
}) => {
    if (!replies || replies.length === 0) {
        return null;
    }

    return (
        <div className={styles["replies-list"]}>
            <p className={styles["replies-title"]}>
                Replies
            </p>
            {replies.map(reply =>
                <Reply
                    key={reply.id}
                    reply={reply}
                />
            )}
        </div>
    );
};

export default ReplyList;
