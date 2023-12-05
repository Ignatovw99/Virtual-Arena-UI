import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import Alert from "./Alert";

import styles from "./Alert.module.css";

const ErrorAlert = ({
    message,
    closeAlert
}) => {
    return (
        <Alert
            message={message}
            closeAlert={closeAlert}
            alertAdditionalClass={styles["error-alert"]}
            icon={
                <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className={`${styles["alert-sign"]} ${styles["error-sign"]}`}
                />
            }
            closeButtonAdditionalClass={styles["error-close-button-container"]}
        />
    );
};

export default ErrorAlert;
