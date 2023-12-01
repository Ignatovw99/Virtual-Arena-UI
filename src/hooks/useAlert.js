import { useState } from "react";

import Alert from "../components/Alert";

const useAlert = () => {
    const [alertState, setAlertState] = useState(null);

    const showAlert = (type, message) => {
        setAlertState({ type, message });
    };

    const closeAlert = () => {
        setAlertState(null);
    };

    const alertProps = { closeAlert, ...alertState };
    const alert = alertState && <Alert {...alertProps} />;

    return { alert, showAlert };
};

export default useAlert;
