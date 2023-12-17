import useHttpRequest from "../useHttpRequest";
import { getRequestUrl } from "../../utils/request";

import { API_BASE_URL, EVENT_URL } from "../../constants/api";
import { POST_METHOD } from "../../constants/request";

const requestUrl = getRequestUrl(API_BASE_URL, EVENT_URL);

const useEventApi = (requestConfiguration) => {
    const { request, loading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const getAllEvents = async () => {
        const response = await request(requestUrl);
        return response.json();
    };

    const getAllUserEvents = async (userId) => {
        const url = `${requestUrl}?userId=${userId}`;
        const response = await request(url);
        return response.json();
    };

    const getEventById = async (id) => {
        const url = `${requestUrl}/${id}`;
        const response = await request(url);
        return response.json();
    };

    const createEvent = async (eventFormData) => {
        const response = await request(requestUrl, {
            method: POST_METHOD,
            body: eventFormData,
            headers: {}
        });
        return response.json();
    };

    return {
        getAllEvents,
        getAllUserEvents,
        getEventById,
        createEvent,
        loading,
        error,
        alert,
        showAlert
    };
};

export default useEventApi;
