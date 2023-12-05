import useHttpRequest from "./useHttpRequest";
import { getRequestUrl } from "../utils/request";

import { API_BASE_URL, EVENT_URL } from "../constants/api";
import { POST_METHOD } from "../constants/request";

const requestUrl = getRequestUrl(API_BASE_URL, EVENT_URL);

const useEventApi = (requestConfiguration) => {
    const { request, loading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const createEvent = async (eventFormData) => {
        const response = await request(requestUrl, {
            method: POST_METHOD,
            body: eventFormData,
            headers: {}
        });
        return await response.json();
    };

    return {
        createEvent,
        loading,
        error,
        alert,
        showAlert
    };
};

export default useEventApi;
