import styles from "./EventTabBar.module.css";

const EventTabBar = () => {
    return (
        <div className={styles["tab-bar"]}>
            <button className={styles["tab-bar-button"]}>
                Details
            </button>
            <button className={`${styles["tab-bar-button"]} ${styles.selected}`}>
                Q&A
            </button>
            <button className={styles["tab-bar-button"]}>
                Polls
            </button>
        </div>
    );
};

export default EventTabBar;
