import useHttpRequest from "../useHttpRequest";

import { API_BASE_URL } from "../../constants/api";

const useReplyApi = (requestConfiguration) => {
    const { request, loading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const getQuestionReplies = async (eventId, questionId) => {
        const requestUrl = `${API_BASE_URL}/api/events/${eventId}/questions/${questionId}/replies`;
        const response = await request(requestUrl);
        return response.json();
    };

    return {
        getQuestionReplies,
        loading,
        error,
        alert,
        showAlert
    };
};

export default useReplyApi;
