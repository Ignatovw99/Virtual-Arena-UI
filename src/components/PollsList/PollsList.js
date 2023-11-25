import Poll from "../Poll";

import styles from "./PollsList.module.css";

const PollsList = () => {
    return (
        <div className={styles["polls-container"]}>
            <Poll />
            <Poll />
            <Poll />
        </div>
    );
};

export default PollsList;
