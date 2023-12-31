import { useAuth0 } from "@auth0/auth0-react";

import { ErrorAlert } from "../components/Alert";
import useStateConditionally from "./useStateConditionally";
import { useAlertConditionally } from "./useAlert";

import {
    GET_METHOD,
    AUTHORIZATION_HEADER,
    BEARER,
    CONTENT_TYPE_HEADER
} from "../constants/request";

const useHttpRequest = (requestConfiguration = {}) => {
    const [loading, setLoading] = useStateConditionally(false, requestConfiguration.includeLoading);
    const [error, setError] = useStateConditionally(null, requestConfiguration.includeError);
    const { alert, showAlert } = useAlertConditionally(requestConfiguration.includeAlert);
    const { getAccessTokenSilently } = useAuth0();

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
            setLoading(true);
            const requestOptions = await createRequestOptions(options);
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw await response.json();
            }
            return response;
        } catch (errorResponse) {
            if (requestConfiguration.showErrorAlert) {
                showAlert(ErrorAlert, errorResponse.message);
            }
            setError(errorResponse);
            throw errorResponse;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error, alert, showAlert };
};

export default useHttpRequest;
