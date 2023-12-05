import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import Alert from "./Alert";

import styles from "./Alert.module.css";

const SuccessAlert = ({
    message,
    closeAlert
}) => {
    return (
        <Alert
            message={message}
            closeAlert={closeAlert}
            alertAdditionalClass={styles["success-alert"]}
            icon={
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`${styles["alert-sign"]} ${styles["success-sign"]}`}
                />
            }
            closeButtonAdditionalClass={styles["success-close-button-container"]}
        />
    );
};

export default SuccessAlert;
