import { useState } from "react";

const useAlert = () => {
    const [alertState, setAlertState] = useState(null);

    const showAlert = (AlertComponent, message) => {
        setAlertState({ AlertComponent, message });
    };

    const closeAlert = () => {
        setAlertState(null);
    };

    const alert = alertState && alertState.AlertComponent && (
        <alertState.AlertComponent
            message={alertState.message}
            closeAlert={closeAlert}
        />
    );

    return { alert, showAlert };
};

export default useAlert;
