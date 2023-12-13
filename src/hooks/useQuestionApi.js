import useHttpRequest from "./useHttpRequest";

import { API_BASE_URL } from "../constants/api";
import { POST_METHOD } from "../constants/request";

const useQuestionApi = (requestConfiguration) => {
    const { request, loading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const getEventQuestions = async (eventId) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/questions`;
        const response = await request(requestUrl);
        return response.json();
    };

    const postEventQuestion = async (eventId, content) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/questions`;
        const response = await request(requestUrl, {
            method: POST_METHOD,
            body: { content }
        });
        return response.json();
    };

    return {
        getEventQuestions,
        postEventQuestion,
        loading,
        error,
        alert,
        showAlert
    };
};

export default useQuestionApi;
