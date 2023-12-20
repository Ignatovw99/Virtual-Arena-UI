import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles["not-found-container"]}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    404
                </h1>
                <h4 className={styles.subtitle}>
                    Opps! Page not found
                </h4>
                <p className={styles.info}>
                    Sorry, the page you're looking for does not exist. If you think something is broken, report a problem.
                </p>
                <div className={styles.buttons}>
                    <Link
                        to="/"
                        className={styles["return-to-home-button"]}
                    >
                        Return Home
                    </Link>
                    <Link
                        to="/"
                        className={styles["report-problem-button"]}
                    >
                        Report Problem
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
