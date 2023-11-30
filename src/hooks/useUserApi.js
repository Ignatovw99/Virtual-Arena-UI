import useHttpRequest from "./useHttpRequest";
import { getRequestUrl } from "../utils/request";

import { API_BASE_URL, USER_PROFILE_URL } from "../constants/api";
import { POST_METHOD } from "../constants/request";

const useUserApi = (requestConfig) => {
    const { request, loading, error } = useHttpRequest(requestConfig);

    const getUserProfile = async () => {
        const url = getRequestUrl(API_BASE_URL, USER_PROFILE_URL);
        const response = await request(url);
        return await response.json();
    };

    const createUserProfile = async (userProfle) => {
        const url = getRequestUrl(API_BASE_URL, USER_PROFILE_URL);
        const response = await request(url, {
            method: POST_METHOD,
            body: JSON.stringify(userProfle)
        });
        return await response.json();
    };

    return { getUserProfile, createUserProfile, loading, error };
};

export default useUserApi;
