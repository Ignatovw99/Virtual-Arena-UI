import useHttpRequest from "../useHttpRequest";
import { getRequestUrl } from "../../utils/request";

import { API_BASE_URL, USER_PROFILE_URL } from "../../constants/api";
import { POST_METHOD, PUT_METHOD } from "../../constants/request";

const requestUrl = getRequestUrl(API_BASE_URL, USER_PROFILE_URL);

const useUserApi = (requestConfiguration) => {
    const { request, loading, error, alert, showAlert } = useHttpRequest(requestConfiguration);

    const getUserProfile = async () => {
        const response = await request(requestUrl);
        return response.json();
    };

    const getUserProfileById = async (id) => {
        const url = `${requestUrl}/${id}`;
        const response = await request(url);
        return response.json();
    };

    const createUserProfile = async (userProfile) => {
        const response = await request(requestUrl, {
            method: POST_METHOD,
            body: JSON.stringify(userProfile)
        });
        return response.json();
    };

    const updateUserProfile = async (userFormData) => {
        const response = await request(requestUrl, {
            method: PUT_METHOD,
            body: userFormData,
            headers: {}
        });
        return response.json();
    };

    return {
        getUserProfile,
        getUserProfileById,
        createUserProfile,
        updateUserProfile,
        loading,
        error,
        alert,
        showAlert
    };
};

export default useUserApi;
