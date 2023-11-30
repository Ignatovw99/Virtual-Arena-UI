import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
    return (
        <div className={styles.spinner}>
            <h2 className={styles["spinner-text"]}>
                Loading...
            </h2>
        </div>
    );
};

export default LoadingSpinner;
