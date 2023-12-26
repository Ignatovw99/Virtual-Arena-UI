import styles from "./ReplyButton.module.css";

const ReplyButton = ({
    repliesCount
}) => {
    let content = "Reply";

    if (repliesCount === 1) {
        content = "1 reply";
    } else if (repliesCount > 1) {
        content = `${repliesCount} replies`;
    }

    return (
        <button className={styles["reply-button"]}>
            {content}
        </button>
    );
};

export default ReplyButton;
