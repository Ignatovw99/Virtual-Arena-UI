import useHttpRequest from "../useHttpRequest";

import { API_BASE_URL } from "../../constants/api";
import { POST_METHOD } from "../../constants/request";

const useEventParticipantsApi = (requestConfiguration) => {
    const { request, loading, setLoading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const getAllEventParticipants = async (eventId) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/participants`;
        const response = await request(requestUrl);
        return response.json();
    };

    const participateInEvent = async (eventId) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/participants`;
        const response = await request(requestUrl, {
            method: POST_METHOD
        });
        return response.json();
    };

    return {
        getAllEventParticipants,
        participateInEvent,
        loading,
        setLoading,
        error,
        alert,
        showAlert
    };
};

export default useEventParticipantsApi;
