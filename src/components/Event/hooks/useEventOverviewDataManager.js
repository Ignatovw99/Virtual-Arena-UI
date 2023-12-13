import { useState, useEffect } from "react";

import useEventDetailsApi from "../../../hooks/useEventDetailsApi";

const useEventOverviewDataManager = () => {
    const [event, setEvent] = useState({});
    const [error, setError] = useState(null);

    const { getEventDetails, loading } = useEventDetailsApi({ initalLoading: true });

    useEffect(() => {
        setupEventOverviewDataManager();

        // eslint-disable-next-line
    }, []);


    const setupEventOverviewDataManager = async () => {
        try {
            const eventDetails = await getEventDetails(7);
            setEvent(eventDetails);
        } catch (error) {
            setError(error.message);
        }
    };

    return { event, loading, error };
};

export default useEventOverviewDataManager;
