import Poll from "../Poll";

import styles from "./PollsRegistry.module.css";

const PollsRegistry = () => {
    return (
        <div className={styles["polls-container"]}>
            <Poll />
            <Poll />
            <Poll />
        </div>
    );
};

export default PollsRegistry;
