import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const useNavigateAfterShowingAlert = (alert) => {
    const [scheduleNavigation, setScheduleNavigation] = useState(false);
    const [to, setTo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (scheduleNavigation && !alert) {
            navigate(to);
        }
    }, [scheduleNavigation, alert, navigate, to]);

    const navigateAfterShowingAlert = (to) => {
        setScheduleNavigation(true);
        setTo(to);
    };

    return navigateAfterShowingAlert;
};

export default useNavigateAfterShowingAlert;
