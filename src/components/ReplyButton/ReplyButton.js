import styles from "./ReplyButton.module.css";

const ReplyButton = ({
    repliesCount,
    toggleRepliesContent
}) => {
    let content = "Reply";

    if (repliesCount === 1) {
        content = "1 reply";
    } else if (repliesCount > 1) {
        content = `${repliesCount} replies`;
    }

    return (
        <button
            className={styles["reply-button"]}
            onClick={toggleRepliesContent}
        >
            {content}
        </button>
    );
};

export default ReplyButton;
