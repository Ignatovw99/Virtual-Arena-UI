import { createContext, useContext, useState, useEffect } from "react";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth0 } from "@auth0/auth0-react";

import LoadingSpinner from "../components/LoadingSpinner";
import { ErrorAlert } from "../components/Alert";
import { useAlert } from "../hooks/useAlert";

import { CONTEXT_NOT_FOUND } from "../constants/common";

const WS_SERVER_URL = "http://localhost:8080/websocket";
const WS_AUTHORIZATION_HEADER = "X-Authorization";
const WS_CONNECTION_INTERRUPTED = "WebSocket connection interrupted";

export const WebSocketConnectionContext = createContext();

export const useWebSocketConnectionContext = () => {
    const context = useContext(WebSocketConnectionContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export const WebSocketConnectionProvider = ({
    children
}) => {
    const [webSocketClient, setWebSocketClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
    const { alert, showAlert } = useAlert();

    useEffect(() => {
        connectToWebSocketServer();

        return () => {
            if (webSocketClient) {
                webSocketClient.disconnect();
            }
        }

        // eslint-disable-next-line
    }, []);

    const connectToWebSocketServer = async () => {
        const accessToken = await getAccessToken();

        const webSocket = new SockJS(WS_SERVER_URL);
        const stompClient = Stomp.over(webSocket);

        stompClient.connect({ [WS_AUTHORIZATION_HEADER]: accessToken },
            () => handleSuccessfulConnection(stompClient),
            handleConnectionError);
    };

    const getAccessToken = async () => {
        try {
            return await getAccessTokenSilently();
        } catch (error) {
            return "";
        }
    };

    const handleSuccessfulConnection = (stompClient) => {
        setWebSocketClient(stompClient);
        setLoading(false);
    };

    const handleConnectionError = (error) => {
        showAlert(ErrorAlert, WS_CONNECTION_INTERRUPTED);
        setLoading(false);
    };

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <WebSocketConnectionContext.Provider value={{
            webSocketClient
        }}>
            {alert}
            {children}
        </WebSocketConnectionContext.Provider>
    );
};
