import { useState } from "react";

export const useAlert = () => {
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

export const useAlertOnce = () => {
    const { alert, showAlert } = useAlert();
    const [shownAlert, setShownAlert] = useState(false);

    const showAlertOnce = (AlertComponent, message) => {
        if (shownAlert) {
            return;
        }
        showAlert(AlertComponent, message);
        setShownAlert(true);
    };

    return {
        alert,
        showAlert: showAlertOnce
    };
};

export const useAlertConditionally = (includeAlert) => {
    const { alert, showAlert } = useAlert();
    return includeAlert ?
        { alert, showAlert } :
        {
            alert: undefined,
            showAlert: () => { }
        }
};
