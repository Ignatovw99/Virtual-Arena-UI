import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ALERT_SHOW_TIME_IN_MILLISECONDS } from '../../constants/common';

import styles from "./Alert.module.css";

const Alert = ({
    message,
    closeAlert,
    icon,
    alertAdditionalClass,
    closeButtonAdditionalClass
}) => {
    setTimeout(() => closeAlert(), ALERT_SHOW_TIME_IN_MILLISECONDS);

    return (
        <div className={`${styles.alert} ${alertAdditionalClass}`}>
            {icon}
            <span className={styles.message}>
                {message}
            </span>
            <span
                className={`${styles["close-button-container"]} ${closeButtonAdditionalClass}`}
                onClick={closeAlert}
            >
                <FontAwesomeIcon
                    icon={faTimes}
                    className={styles["close-button"]}
                />
            </span>
        </div>
    );
};

export default Alert;
