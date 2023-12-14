import useHttpRequest from "../useHttpRequest";

import { API_BASE_URL } from "../../constants/api";
import { POST_METHOD } from "../../constants/request";

const useQuestionLikeApi = (requestConfiguration) => {
    const { request, loading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const getQuestionLikes = async (eventId, questionId) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/questions/${questionId}/likes`;
        const response = await request(requestUrl);
        return response.json();
    };

    const likeQuestion = async (eventId, questionId) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/questions/${questionId}/likes`;
        const response = await request(requestUrl, {
            method: POST_METHOD
        });
        return response.json();
    };

    return {
        getQuestionLikes,
        likeQuestion,
        loading,
        error,
        alert,
        showAlert
    };
};

export default useQuestionLikeApi;
