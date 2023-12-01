import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCircleCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { ALERT_SHOW_TIME_IN_MILLISECONDS } from '../../constants/common';

import styles from "./Alert.module.css";

const Alert = ({
    type,
    message,
    closeAlert
}) => {
    const additionalProperties = additionalAlertConfig[type];

    if (!additionalProperties) {
        return null;
    }

    setTimeout(() => closeAlert(), ALERT_SHOW_TIME_IN_MILLISECONDS);

    return (
        <div className={`${styles.alert} ${additionalProperties.alert}`}>
            {additionalProperties.signIcon}
            <span className={styles.message}>
                {message}
            </span>
            <span
                className={`${styles["close-button-container"]} ${additionalProperties.closeButtonContainer}`}
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

const additionalAlertConfig = {
    error: {
        alert: styles["error-alert"],
        signIcon: (<FontAwesomeIcon
            icon={faExclamationCircle}
            className={`${styles["alert-sign"]} ${styles["error-sign"]}`}
        />),
        closeButtonContainer: styles["error-close-button-container"]
    },
    success: {
        alert: styles["success-alert"],
        signIcon: (<FontAwesomeIcon
            icon={faCircleCheck}
            className={`${styles["alert-sign"]} ${styles["success-sign"]}`}
        />),
        closeButtonContainer: styles["success-close-button-container"]
    }
};

export default Alert;
