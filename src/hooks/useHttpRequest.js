import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import {
    GET_METHOD,
    AUTHORIZATION_HEADER,
    BEARER,
    CONTENT_TYPE_HEADER
} from "../constants/request";

const useHttpRequest = (requestConfig) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    const setLoadingBasedOnConfig = (value) => {
        if (requestConfig && requestConfig.excludeLoading) {
            return;
        }
        setLoading(value);
    };

    const setErrorBasedOnConfig = (err) => {
        if (requestConfig && requestConfig.excludeError) {
            throw err;
        }
        setError(err);
    };

    const createAuthorizationHeader = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            return {
                name: AUTHORIZATION_HEADER,
                value: `${BEARER} ${accessToken}`
            };
        } catch (err) {
            return null;
        }
    };

    const createRequestOptions = async (options) => {
        const requestOptions = {
            method: GET_METHOD,
            headers: {
                [CONTENT_TYPE_HEADER]: "application/json"
            }
        };

        if (options) {
            Object.assign(requestOptions, { ...options })
        }

        const authorizationHeader = await createAuthorizationHeader();
        if (authorizationHeader) {
            requestOptions.headers[authorizationHeader.name] = authorizationHeader.value;
        }

        return requestOptions;
    };

    const request = async (url, options) => {
        try {
            setLoadingBasedOnConfig(true);
            const requestOptions = await createRequestOptions(options);
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw await response.json();
            }
            return response;
        } catch (errorResponse) {
            setErrorBasedOnConfig(errorResponse);
        } finally {
            setLoadingBasedOnConfig(false);
        }
    };

    return { request, loading, error };
};

export default useHttpRequest;
