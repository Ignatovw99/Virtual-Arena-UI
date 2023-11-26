import styles from "./Poll.module.css";

const Poll = () => {
    return (
        <div className={styles.poll}>
            <div className={styles.question}>
                What is your favourite programming language?
            </div>
            <div className={styles.answers}>
                <div className={`${styles.answer} ${styles.selected}`}>
                    <span className={styles["percentage-bar"]}></span>
                    <span className={styles["answer-value"]}>Java</span>
                    <span className={styles["percentage-value"]}>50%</span>
                </div>
                <div className={styles.answer}>
                    <span className={styles["percentage-bar"]}></span>
                    <span className={styles["answer-value"]}>JavaScript</span>
                    <span className={styles["percentage-value"]}>50%</span>
                </div>
            </div>
        </div>
    );
};

export default Poll;
