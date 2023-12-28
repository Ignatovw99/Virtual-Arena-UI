import Reply from "../Reply";

import styles from "./ReplyList.module.css";

const ReplyList = ({
    replies
}) => {
    return (
        <div className={styles["replies-list-container"]}>
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
